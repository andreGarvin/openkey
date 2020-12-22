export interface ServiceError {
  code: string;
  message: string;
  http_status: number;
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
