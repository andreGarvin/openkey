import * as express from 'express';

// utils
import { FormError, ServiceError } from '../common/service-error';
import { MakeJsonResponse } from '../common/json-response';
import logger from '../common/logger';

const STATUS_CODE = 500;

// This middleware catches all uncuaght execptions catch by express and returns internal error message while logging the error
export default (): express.ErrorRequestHandler => {
  return (
    err: Error | ServiceError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    logger.error('internal server error');
    logger.error(err);

    if (err instanceof Error) {
      const newError = FormError(err);

      return res
        .status(STATUS_CODE)
        .json(MakeJsonResponse(undefined, newError));
    }

    // if any cause the err does not a have a http status
    if (!err.http_status) {
      err.http_status = STATUS_CODE;
    }

    res.status(err.http_status).json(MakeJsonResponse(undefined, err));
  };
};
