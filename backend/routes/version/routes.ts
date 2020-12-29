import * as express from 'express';

// utils
import { MakeJsonResponse } from '../../common/json-response';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
  return res.status(200).json(
    MakeJsonResponse({
      app_name: process.env.APP_NAME,
      commit_sha: process.env.COMMIT_SHA || 'no revision',
    })
  );
});

export default router;
