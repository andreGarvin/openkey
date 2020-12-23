import * as express from 'express';

// controllers
import * as feedback from './controller';

// middlewares
import ValidateRequestBodyHandler from '../../middleware/validate-request-body';

// schemas
import { NewFeedback } from './schemas';
import { MakeJsonResponse } from '../../common/json-response';

const router = express.Router();

router.post(
  '/',
  ValidateRequestBodyHandler(NewFeedback),
  (req: express.Request, res: express.Response) => {
    return feedback
      .Create(req.body)
      .then((response) => res.status(201).json(MakeJsonResponse(response)))
      .catch((e) =>
        res.status(e.http_status).json(MakeJsonResponse(undefined, e))
      );
  }
);

export default router;
