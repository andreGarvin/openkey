import * as express from 'express';

// utils
import { MakeJsonResponse } from '../../common/json-response';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
  return res.status(200).json(
    MakeJsonResponse({
      APP_NAME: process.env.APP_NAME,
      COMMIT_SHA: process.env.COMMIT_SHA || 'no revision',
    })
  );
});

export default router;
