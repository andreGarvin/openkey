import * as express from 'express';
import { MakeJsonResponse } from '../../common/json-response';

// controllers
import health from './controller';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
  const heavy = req.query.heavy === 'true';

  return health(heavy)
    .then((status) =>
      res.status(200).json(MakeJsonResponse({ message: status }))
    )
    .catch((e) =>
      res.status(e.http_status).json(MakeJsonResponse(undefined, e))
    );
});

export default router;
