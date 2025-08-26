import { ServiceError } from './service-error';

// json response for all api responses
interface jsonResponse {
  error: ServiceError | null;
  response: any | null;
}

// creates the json repsonse
export const MakeJsonResponse = (
  resp: any,
  err?: ServiceError
): jsonResponse => {
  if (err) {
    return {
      error: err,
      response: null,
    };
  }

  return {
    error: null,
    response: resp,
  };
};
