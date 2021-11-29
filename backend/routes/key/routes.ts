import * as express from 'express';

// controllers
import * as key from './controller';

// utils
import { MakeJsonResponse } from '../../common/json-response';

// middlewares
import ValidateRequestBodyHandler from '../../middleware/validate-request-body';

// schemas
import { NewKey, NewReport } from './schemas';

const router = express.Router();

// create a new key
router.post(
  '/create',
  ValidateRequestBodyHandler(NewKey),
  (req: express.Request, res: express.Response) => {
    return key
      .Create(req.body)
      .then((key) => {
        res.status(201).json(MakeJsonResponse(key));
      })
      .catch((e) => {
        res.status(e.http_status).json(MakeJsonResponse(undefined, e));
      });
  }
);

// get key infotmation
router.get('/info/:alias', (req: express.Request, res: express.Response) => {
  const alias = req.params.alias;

  return key
    .Get(alias)
    .then((key) => {
      res.status(200).json(MakeJsonResponse(key));
    })
    .catch((e) => {
      res.status(e.http_status).json(MakeJsonResponse(undefined, e));
    });
});

// report a key
router.delete(
  '/report/:alias',
  ValidateRequestBodyHandler(NewReport),
  (req: express.Request, res: express.Response) => {
    return key
      .Report(req.params.alias, req.body)
      .then((reportId) => {
        const statusCode = reportId === 'deteled' ? 200 : 201;

        res.status(statusCode).json(MakeJsonResponse({ report_id: reportId }));
      })
      .catch((e) => {
        res.status(e.http_status).json(MakeJsonResponse(undefined, e));
      });
  }
);

export default router;
