import * as express from 'express';
import * as joi from 'joi';

// utils
import { MakeValidationError } from '../common/service-error';
import { MakeJsonResponse } from '../common/json-response';

// this validates any json request body
export default (schema: joi.ObjectSchema<any>): express.RequestHandler => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const err = MakeValidationError(error);

      res.status(200).json(MakeJsonResponse(err));
      return;
    }

    return next();
  };
};
