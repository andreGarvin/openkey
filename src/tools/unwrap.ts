import { ServiceError } from "src/tools/service-error";

export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export async function unwrap<R, E = ServiceError>(
  fn: Promise<R>
): Promise<Result<R, E>> {
  try {
    const result = await fn;
    return { ok: true, value: result };
  } catch (err) {
    return { ok: false, error: err as E };
  }
}
