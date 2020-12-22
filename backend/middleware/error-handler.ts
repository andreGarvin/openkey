import * as express from 'express';

import { MakeError, ServiceError } from '../common/service-error';
import { MakeJsonResponse } from '../common/json-response';
import logger from '../common/logger';

const INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR';
const STATUS_CODE = 500;

// (err: Error, req: express.Request, res: express.Response) => {};
// res.status(500).json(MakeError(err.message, INTERNAL_SERVER_ERROR, 500));

export default (): express.ErrorRequestHandler => {
  return (
    err: Error | ServiceError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    logger.error('Unexpected Error Caught');

    // if the error is a instance of the 'Error' object
    if (err instanceof Error) {
      const newError = MakeError(
        'something went wrong, this incident has been ackownledged',
        INTERNAL_SERVER_ERROR,
        STATUS_CODE
      );

      return res
        .status(STATUS_CODE)
        .json(MakeJsonResponse(undefined, newError));
    }

    // if the error has the property 'http_code' then set the http status code to the one provided
    if (!err.http_status) {
      err.http_status = STATUS_CODE;
    }

    res.status(err.http_status).json(MakeJsonResponse(undefined, err));
  };
};
