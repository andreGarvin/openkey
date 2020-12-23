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
  CONNECTION_ERROR = 'CONNECTION_ERROR_',
  KEY_NOT_FOUND_ERROR = 'KEY_NOT_FOUND_ERROR',
  ALIAS_NOT_FOUND_ERROR = 'ALIAS_NOT_FOUND_ERROR',
}

export const Get = async (alias: string): Promise<KeyInfoResponse> => {
  const key = await GetKeyByAlias(alias);

  if (!key) {
    throw MakeError(
      'key does not exist',
      KeyErrorCode.KEY_NOT_FOUND_ERROR,
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
    const aliases = await getAliases();

    let keyId: number = 0;
    let alias: string;

    do {
      alias = aliases[Math.floor(Math.random() * aliases.length)];
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

    throw FormError(e);
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
        KeyErrorCode.KEY_NOT_FOUND_ERROR,
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

    throw FormError(e);
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
      favicon: key.url + '/favicon.ico',
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
    const response = await fetch(href, {
      method: 'GET',
      redirect: 'manual',
    });

    const redirected = redirectStatusCodes.includes(response.status);
    let finalURL = response.url;
    if (redirected) {
      finalURL = response.headers.get('location');
    }

    const url = new URL(finalURL);

    return {
      redirected: url.href,
      secure: url.protocol === 'https:',
    };
  } catch (e) {
    if (e.code === 'ECONNREFUSED') {
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

const getAliases = async (): Promise<string[]> => {
  try {
    const response = await fetch(
      'https://randomwordgenerator.com/json/words.json',
      {
        method: 'GET',
      }
    );

    const { data }: WordAPIResponse = await response.json();

    return data.map((w) => w.word);
  } catch (e) {
    logger.error(e);

    throw FormError(e);
  }
};

// app.get('/api/fetch_keys', (req, res) => {
//     mongo.connect(MONGO_URL, (err, client) => {
//         assert.equal(err, null);

//         const db = client.db('openkey')
//         db.collection('keys').find({}).toArray((err, collection) => {
//             return res.json({
//                 keys: collection,
//                 status: 'OK'
//             })
//         })
//     })
// })

// app.get('/api/fetch_key', (req, res) => {
//     const queryKey = req.query.key

//     mongo.connect(MONGO_URL, (err, client) => {
//         assert.equal(err, null);

//         const db = client.db('openkey')
//         db.collection('keys').findOne({ key: queryKey })
//             .then(doc => {
//                 if (doc === null) {
//                     return res.json({
//                         errorMessage: `Key '${queryKey}' does not exist or has expired.`,
//                         status: 'NULL'
//                     })
//                 }

//                 res.json({
//                     key: doc,
//                     status: 'OK'
//                 })
//             })
//     })
// })

// app.post('/api/create_key', ({ query }, res) => {

//     mongo.connect(MONGO_URL, (err, client) => {
//         assert.equal(err, null);

//         const db = client.db('openkey')
//         const newKey = {
//             url,
//             time,
//             proto: new URL(url).protocol
//         };

//         async function createAliasName(words) {
//             let randWord = words[Math.floor(Math.random() * words.length)]
//             const document = await db.collection('keys').findOne({ key: randWord })
//             while (document !== null) {
//                 randWord = words[Math.floor(Math.random() * words.length)]
//             }
//             return randWord.length === 2 ? randWord.split(' ')[0] : randWord;
//         }
//         async function checkAndInsert(newKey) {
//             const document = await db.collection('keys').findOne({ url: newKey.url })
//             if (document === null) {
//                 const { data } = await axios.get('https://randomwordgenerator.com/json/words.json')
//                 newKey.key = await createAliasName(data.data.map(i => i.word))
//                 return await db.collection('keys').insertOne(newKey)
//             }
//             return {
//                 errorMessage: 'This key url already exists',
//                 key: document,
//             }
//         }

//         checkAndInsert(newKey)
//             .then(resp => {
//                 if (resp.errorMessage !== undefined) {
//                     return res.json({
//                         ...resp,
//                         status: 'NULL'
//                     })
//                 }
//                 return res.json(newKey)
//             })

//         let expirationTime = time !== '1' ? (parseInt(time) * 60000) : 10 * 60000;
//         setTimeout(() => {
//             async function deleteKeyAndReport(url) {
//                 const document = await db.collection('keys').findOne({ url })
//                 await db.collection('reports').deleteOne({ key: document.key })
//                 await db.collection('keys').deleteOne({ key: document.key })
//             }

//             deleteKeyAndReport(newKey.url)
//                 .then(() => console.log(`deleted ${newKey.url}`))
//                 .catch(err => {
//                     console.error(err)
//                     process.exit()
//                 })
//         }, expirationTime)
//     })
// })

// app.post('/api/report_key', (req, res) => {
//     const { body } = req

//     mongo.connect(MONGO_URL, (err, client) => {
//         assert.equal(err, null)
//         const db = client.db('openkey')

//         async function checkReportAndDelete(report) {
//             const collection = await db.collection('reports').findOne({ key: report.key })
//             if (collection !== null) {
//                 if (collection.count >= 6) {
//                     return await db.collection('reports').deleteOne({
//                         key: report.key
//                     })
//                 }
//                 return await db.collection('reports').updateOne({
//                     key: report.key
//                 }, {
//                     $set: {
//                         count: collection.count + 1
//                     }
//                 })
//             }

//             return await db.collection('reports').insertOne(Object.assign(report, {
//                 count: 1
//             }))
//         }

//         checkReportAndDelete(body)
//             .then(() => res.sendStatus(200))
//     })
// })
