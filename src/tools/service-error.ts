export type ServiceError = {
  name: string;
  message: string;
};

// enum error codes
enum ErrorCodes {
  InternalServerError = "INTERNAL_SERVER_ERROR",
}

export const InternalServiceError = CreateServiceError(
    ErrorCodes.InternalServerError,
    "internal server error"
  ),
  InvalidError = CreateServiceError(
    "InvalidRequest",
    "Invalid request was made."
  );

export function CreateServiceError(
  name: string,
  message: string
): ServiceError {
  return {
    name,
    message,
  };
}

export class ServiceErrors {
  private errors: ServiceError[];

  constructor() {
    this.errors = [];
  }

  getErrors() {
    return this.errors;
  }

  append(error: Error | ServiceError) {
    this.errors.push(CreateServiceError(error.name, error.message));
  }
}
