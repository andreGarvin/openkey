import { ServiceError } from './service-error';

interface JsonResponse {
  error: ServiceError;
  response: any;
}

export const MakeJsonResponse = (
  resp: any,
  err?: ServiceError
): JsonResponse => {
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
