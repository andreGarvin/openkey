import * as dotenv from 'dotenv';

dotenv.config();

import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as helmet from 'helmet';
import * as path from 'path';

const app = express();

// utils
import logger from './common/logger';
import connection from './common/db';

// middlewares
import ErrorHandler from './middleware/error-handler';

// queries
import { RemoveExpiredKeys } from './routes/key/queries';

// api routes
import Route from './routes';

const PORT = process.env.PORT || 8000;
const cleanupInterval = 300000;

// middleware
app.use(express.static(path.resolve(__dirname, process.env.BUNDLE)));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(helmet());

// routes
app.use('/', Route);

app.use(ErrorHandler());

// connecting to the database
connection()
  .then(() => {
    // deletes any expired key every 5 minutes
    setInterval(() => {
      RemoveExpiredKeys().catch((e) => {
        console.error(e);
        process.exit(e);
      });
    }, cleanupInterval);

    // only starting the server if sucessfully connected to the database
    app.listen(PORT, () => logger.info(`Server running on PORT ${PORT}`));
  })
  .catch(logger.error);
