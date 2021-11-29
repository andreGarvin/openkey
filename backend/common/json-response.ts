import { ServiceError } from './service-error';

// json response for all api responses
interface jsonResponse {
  error: ServiceError;
  response: any;
}

// creates the json repsonse
export const MakeJsonResponse = (
  resp: any,
  err?: ServiceError
): jsonResponse => {
  const jsonResponse = {
    error: null,
    response: null,
  };

  if (resp) {
    jsonResponse.response = resp;
  }

  if (err) {
    jsonResponse.error = err;
  }

  return jsonResponse;
};
