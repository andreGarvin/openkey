import * as express from 'express';
import { MakeError } from '../../common/service-error';
import { MakeJsonResponse } from '../../common/json-response';

import * as key from './controller';

const router = express.Router();

// get key infotmation
router.get('/info/:alias', (req: express.Request, res: express.Response) => {
  const alias = req.params.alias;
  key
    .Get(alias)
    .then((key) => {
      res.status(200).json(MakeJsonResponse(key));
    })
    .catch((e) => {
      res.status(400).json(MakeJsonResponse(undefined, e));
    });
});

// report a key
router.post('/report/:alias');

// create a new key
router.post('/create');

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
//     const { url = '', time = '' } = query;

//     if (url === '') {
//         return res.json({
//             errorMessage: 'No url was given'
//         })
//     }

//     if (time === '') {
//         return resp.json({
//             errorMessage: 'No time was given'
//         })
//     }

//     if (!['5','15','25','30','1'].includes(time)) {
//         return res.json({
//             errorMessage: 'This is invlaid time must be within 5 minutes and 1 hour.'
//         })
//     }

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

export default router;
