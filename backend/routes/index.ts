import * as express from 'express';

// routes
import Feedback from './feedback/routes';
import Version from './version/routes';
import Health from './health/routes';
import Key from './key/routes';

// utils
import { MakeJsonResponse } from '../common/json-response';
import { MakeError } from '../common/service-error';

const router = express.Router();

// api routes
router.use('/api/feedback', Feedback);
router.use('/api/version', Version);
router.use('/api/health', Health);
router.use('/api/key', Key);

// if no api endpoint was mtached
router.use('/api', (req: express.Request, res: express.Response) => {
  const err = MakeError('api ednpoint not found', 'NOT_FOUND_ERROR', 404);
  return res.status(404).json(MakeJsonResponse(undefined, err));
});

// application endpoint
router.get('/', (req: express.Request, res: express.Response) => {
  // res.sendFile('index.html');
  return res.send('React App');
});

// any other route will just return the application
router.get('*', (req: express.Request, res: express.Response) => {
  // res.sendFile('index.html');
  return res.send('React App');
});

export default router;
