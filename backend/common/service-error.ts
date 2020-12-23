import Joi = require('joi');

interface validateErrorMessage {
  field: string;
  message: string;
}
export interface ServiceError {
  code: string;
  message: string;
  http_status: number;
  errors?: validateErrorMessage[];
}

export const MakeError = (
  message: string,
  code: string,
  httpStatus: number
): ServiceError => {
  return {
    code,
    message,
    http_status: httpStatus,
  };
};

const INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR';
const STATUS_CODE = 500;

export const FormError = (error: Error): ServiceError => {
  return {
    http_status: STATUS_CODE,
    code: INTERNAL_SERVER_ERROR,
    message: 'something went wrong, this incident has been ackownledged',
  };
};

export const MakeValidationError = (err: Joi.ValidationError): ServiceError => {
  const errs: validateErrorMessage[] = err.details.map((e) => ({
    message: e.message,
    field: e.context.key,
  }));

  return {
    errors: errs,
    http_status: 400,
    message: 'invalid data',
    code: 'INVALID_DATA_ERROR',
  };
};
