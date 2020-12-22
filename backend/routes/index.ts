import * as express from 'express';

import Version from './version/routes';
import Health from './health/routes';
import App from './app/routes';

import logger from '../common/logger';

const router = express.Router();

// api routes
router.use('/api/version', Version);
router.use('/api/health', Health);
router.use('/api/key', App);

router.use('/api', (req: express.Request, res: express.Response) => {
  return res.status(404).json({
    error: 'api ednpoint not found',
  });
});

router.get('/', (req: express.Request, res: express.Response) => {
  throw new Error('hello world');
  return res.send('React App');
  // res.sendFile('index.html');
});

router.get('*', (req: express.Request, res: express.Response) => {
  logger.debug('redirecting to app route');

  return res.redirect('/');
});

export default router;
