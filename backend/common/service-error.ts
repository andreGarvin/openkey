import joi = require('joi');

const INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR';
const STATUS_CODE = 500;

// joi validation error response
interface validateErrorMessage {
  field: string;
  message: string;
}

// api json error response
export interface ServiceError {
  code: string;
  message: string;
  http_status: number;
  // if the error response is froma  joi validatione error
  errors?: validateErrorMessage[];
}

// creates standard error response for all api json responses
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

// creates a error response from a runtine error
export const FormError = (error: Error): ServiceError => {
  return {
    http_status: STATUS_CODE,
    code: INTERNAL_SERVER_ERROR,
    message: 'something went wrong, this incident has been ackownledged',
  };
};

// creates the validation error response
export const MakeValidationError = (err: joi.ValidationError): ServiceError => {
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
