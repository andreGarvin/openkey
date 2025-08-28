import { CreateServiceError } from "src/tools/service-error";

export const RecordNotFoundError = CreateServiceError(
  "RECORD_NOT_FOUND",
  "record not found"
);
