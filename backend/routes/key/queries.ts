import { getConnection, getRepository } from 'typeorm';
import logger from '../../common/logger';

import { Report } from '../../repository/report';
import { Key } from '../../repository/key';

// the public database key information
export interface KeyInfo {
  url: string;
  alias: string;
  secure: boolean;
  redirect: string;
  expires_at: Date;
  created_at: Date;
}

// creates and inserts a new key into keys table and returns the database id
export const CreateKey = async (
  url: string,
  alias: string,
  expiration: Date,
  secure: boolean = false,
  redirected: string = ''
): Promise<number> => {
  try {
    const db = getRepository(Key).createQueryBuilder();

    const value = {
      url,
      alias,
      secure: secure,
      redirect: redirected,
      expires_at: expiration,
    };

    const result = await db
      .insert()
      .into(Key)
      .values([value])
      .returning('id')
      .execute();

    return result.raw[0].id;
  } catch (e) {
    logger.error('failed to insert new key into keys table');

    throw e;
  }
};

// finds key by alias and returns the key information
export const GetKeyByAlias = async (alias: string): Promise<KeyInfo> => {
  try {
    const db = getRepository(Key).createQueryBuilder('keys');

    const key = await db
      .select([
        'keys.url',
        'keys.alias',
        'keys.secure',
        'keys.redirect',
        'keys.expires_at',
        'keys.created_at',
      ])
      .where('keys.alias = :alias', { alias })
      .getOne();

    return key;
  } catch (e) {
    logger.error('failed to retrieve key by id');

    throw e;
  }
};

// finds key by id and returns the key information
export const GetKeyById = async (id: number): Promise<KeyInfo> => {
  try {
    const db = getRepository(Key).createQueryBuilder('keys');

    const key = db
      .select([
        'keys.url',
        'keys.alias',
        'keys.secure',
        'keys.redirect',
        'keys.expires_at',
        'keys.created_at',
      ])
      .where('keys.id = :id', { id })
      .getOne();

    return key;
  } catch (e) {
    logger.error('failed to retrieve key by id');

    throw e;
  }
};

// returns the serial id of the key, if not found it returns  -1
export const KeyExist = async (alias: string): Promise<number> => {
  try {
    const db = getRepository(Key).createQueryBuilder('keys');

    const key = await db
      .select('keys.id')
      .where('keys.alias = :alias', { alias })
      .getOne();

    return key ? key.id : -1;
  } catch (e) {
    logger.error('failed to retrieve key id of matching alias');

    throw e;
  }
};

// deletes all keys and reports related when the expiration has passed
export const RemoveExpiredKeys = async (): Promise<void> => {
  try {
    const db = getConnection().createQueryBuilder();

    // deleeting all keys and returning their database id
    const keys = await db
      .delete()
      .from(Key)
      .where('expires_at <= :currentTime', { currentTime: new Date() })
      .returning('id')
      .execute();

    if (keys.affected) {
      const keyIds = keys.raw.map((key) => key.id);

      // deletes all reports matching the database id
      await db
        .delete()
        .from(Report)
        .where('reports.key_id IN (:...ids)', { ids: keyIds })
        .execute();
    }
  } catch (e) {
    logger.error(e);

    throw e;
  }
};

// creates and inserts a report for key
export const CreateReport = async (
  keyId: number,
  message: string
): Promise<string> => {
  try {
    const db = getRepository(Report).createQueryBuilder();

    const result = await db
      .insert()
      .into(Report)
      .values([
        {
          keyId,
          message,
        },
      ])
      .returning('report_id')
      .execute();

    return result.raw[0].report_id;
  } catch (e) {
    logger.error('failed to insert new report into reports table');

    throw e;
  }
};

// returns the number of reports related to a key
export const GetReportCount = async (keyId: number): Promise<number> => {
  try {
    const db = getRepository(Report).createQueryBuilder('reports');

    const report = await db
      .select('COUNT(reports.key_id)', 'count')
      .where('reports.key_id = :id', { id: keyId })
      .getRawOne();

    // the count returned is a string not a base 10 interger
    return parseInt(report.count, 10);
  } catch (e) {
    logger.error(
      'failed to get count of report macthing key id from reports table'
    );

    throw e;
  }
};

// deletes the key and all reports related to the key
export const DeleteKeyAndAllReports = async (keyId: number): Promise<void> => {
  try {
    const db = getConnection().createQueryBuilder();

    await db
      .delete()
      .from(Report)
      .where('key_id = :id', { id: keyId })
      .execute();

    await db.delete().from(Key).where('id = :id', { id: keyId }).execute();
  } catch (e) {
    logger.error('failed to key and related reports from database');

    throw e;
  }
};
