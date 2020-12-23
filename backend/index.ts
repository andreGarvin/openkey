import * as dotenv from 'dotenv';

dotenv.config();

import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';

const app = express();

// utils
import logger from './common/logger';
import connection from './common/db';

// middleware
import ErrorHandler from './middleware/error-handler';

// queries
import { RemoveExpiredKeys } from './routes/key/queries';

// api routes
import Route from './routes';

const PORT = process.env.PORT || 8000;

// middleware
app.use(express.static(path.resolve(__dirname, process.env.BUNDLE)));
app.use(bodyParser.json());

// routes
app.use('/', Route);

app.use(ErrorHandler());

// connecting to the database and then start the server
connection()
  .then(() => {
    // deletes any expired key every 5 minutes
    setInterval(() => {
      RemoveExpiredKeys().catch((e) => {
        console.error(e);
        process.exit(e);
      });
    }, 300000);

    app.listen(PORT, () => logger.info(`Server running on PORT ${PORT}`));
  })
  .catch(logger.error);
