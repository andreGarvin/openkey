// utils
import { MakeError } from '../../common/service-error';
import logger from '../../common/logger';

// queries
import HealthCheck from './queries';

// error codes
enum HealthErrorCode {
  FAILED_DEPENDENCY_EXCEPTION = 'FAILED_DEPENDENCY_ERROR',
}

// make returns a message for health check
export default async (heavy: boolean): Promise<string> => {
  try {
    if (heavy) {
      await HealthCheck();

      return 'service is still running and dependencies were sucessfully tested';
    }

    return 'everything is running';
  } catch (e) {
    logger.error(e);

    throw MakeError(
      'dependency failed',
      HealthErrorCode.FAILED_DEPENDENCY_EXCEPTION,
      424
    );
  }
};
