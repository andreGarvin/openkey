import * as path from 'path';

import * as swaggerUi from 'swagger-ui-express';
import * as express from 'express';
import * as YAML from 'yamljs';

// routes
import Feedback from './feedback/routes';
import Version from './version/routes';
import Health from './health/routes';
import Key from './key/routes';

// utils
import { MakeJsonResponse } from '../common/json-response';
import { MakeError } from '../common/service-error';

const router = express.Router();
const documentation = YAML.load(
  path.join(__dirname, '..', '..', 'swagger.yaml')
);
const bundle = path.resolve(__dirname, '..', '..', process.env.BUNDLE);

// api routes
router.use('/api/docs', swaggerUi.serve, swaggerUi.setup(documentation));
router.use('/api/feedback', Feedback);
router.use('/api/version', Version);
router.use('/api/health', Health);
router.use('/api/key', Key);

// if no api endpoint was matched
router.use('/api', (req: express.Request, res: express.Response) => {
  const err = MakeError('api ednpoint not found', 'NOT_FOUND_ERROR', 404);
  return res.status(404).json(MakeJsonResponse(undefined, err));
});

// application endpoint
router.get('/', (req: express.Request, res: express.Response) => {
  return res.sendFile(path.join(bundle, 'index.html'));
});

// any other route will just return the application
router.get('*', (req: express.Request, res: express.Response) => {
  return res.sendFile(path.join(bundle, 'index.html'));
});

export default router;
