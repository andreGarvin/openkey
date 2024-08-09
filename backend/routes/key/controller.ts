import * as dateFn from 'date-fns';
import fetch from 'node-fetch';
import { URL } from 'url';

// utils
import { FormError, MakeError } from '../../common/service-error';
import logger from '../../common/logger';

// interfaces
import { KeyInfoResponse, NewKeyInfo, NewReportInfo } from './interfaces';

// queries
import {
  KeyInfo,
  KeyExist,
  CreateKey,
  GetKeyById,
  CreateReport,
  GetKeyByAlias,
  GetReportCount,
  DeleteKeyAndAllReports,
} from './queries';

enum KeyErrorCode {
  CONNECTION_ERROR = 'CONNECTION_ERROR',
  ALIAS_NOT_FOUND_ERROR = 'ALIAS_NOT_FOUND_ERROR',
}

export const Get = async (alias: string): Promise<KeyInfoResponse> => {
  const key = await GetKeyByAlias(alias);

  if (!key) {
    throw MakeError(
      'key does not exist',
      KeyErrorCode.ALIAS_NOT_FOUND_ERROR,
      404
    );
  }

  return formatKeyData(key);
};

export const Create = async (newKey: NewKeyInfo): Promise<KeyInfoResponse> => {
  try {
    if (typeof newKey.expiration === 'string') {
      newKey.expiration = parseInt(newKey.expiration, 10);
    }

    const report = await getURLReport(newKey.url);

    let keyId: number = 0;
    let alias: string;

    do {
      alias = await getAliases();
      keyId = await KeyExist(alias);
    } while (keyId !== -1);

    const expirationDate = dateFn.addMinutes(new Date(), newKey.expiration);

    const newKeyId = await CreateKey(
      newKey.url,
      alias,
      expirationDate,
      report.secure,
      report.redirected
    );

    return formatKeyData(await GetKeyById(newKeyId));
  } catch (e) {
    logger.error(e);

    if (e instanceof Error) {
      throw FormError(e);
    }

    throw e;
  }
};

export const Report = async (
  alias: string,
  { message = '' }: NewReportInfo
): Promise<string> => {
  try {
    const keyId = await KeyExist(alias);

    if (keyId === -1) {
      throw MakeError(
        'key does not exist',
        KeyErrorCode.ALIAS_NOT_FOUND_ERROR,
        404
      );
    }

    const reportCount = await GetReportCount(keyId);

    if (reportCount > 10) {
      await DeleteKeyAndAllReports(keyId);

      return 'deleted';
    }

    return await CreateReport(keyId, message.trim());
  } catch (e) {
    logger.error(e);

    if (e instanceof Error) {
      throw FormError(e);
    }

    throw e;
  }
};

const formatKeyData = (key: KeyInfo): KeyInfoResponse => {
  return {
    alias: key.alias,
    created_at: new Date(key.created_at).toISOString(),
    expires_at: new Date(key.expires_at).toISOString(),
    url: {
      href: key.url,
      secure: key.secure,
      redirects: key.redirect,
    },
  };
};
interface URLReport {
  secure: boolean;
  redirected: string;
}

const redirectStatusCodes = [301, 302, 303, 307, 308];

const getURLReport = async (href: string): Promise<URLReport> => {
  try {
    const report = {
      secure: false,
      redirected: '',
    };

    const response = await fetch(href, {
      method: 'GET',
      timeout: 10000,
      redirect: 'manual',
    });

    const redirected = redirectStatusCodes.includes(response.status);

    if (redirected) {
      const redirectURL = response.headers.get('location');

      const url = new URL(redirectURL);

      report.redirected = url.href;
      report.secure = url.protocol === 'https:';
    } else {
      const url = new URL(response.url);

      report.secure = url.protocol === 'https:';
    }

    return report;
  } catch (e) {
    if (e.type === 'request-timeout' || e.code === 'ECONNREFUSED') {
      throw MakeError(
        'failed create a status check on the site, this could be that the site is down or the domain is no longer in service',
        KeyErrorCode.CONNECTION_ERROR,
        400
      );
    }

    logger.error(e);

    throw FormError(e);
  }
};

interface WordAPIResponse {
  data: { [key: string]: string }[];
}

const getAliases = async (): Promise<string> => {
  try {
    const response = await fetch(
      'https://random-word-api.herokuapp.com/word',
      {
        method: 'GET',
      }
    );

    if (response.status !== 200) {
      logger.error(
        'random word generator returned a non %s status code',
        response.status
      );

      console.log(await response.text());
      throw MakeError('Could not create key', 'INTERNAL_SERVER_ERROR', 500);
    }

    const [word]: string[] = await response.json();

    return word;
  } catch (e) {
    logger.error(e);

    if (e instanceof Error) {
      throw FormError(e);
    }

    throw e;
  }
};
