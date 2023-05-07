import { ERROR_FORBIDDEN } from '../config/constants';

export const FORBIDDEN_ERROR = 403;

class ForbiddenError extends Error {
  statusCode = FORBIDDEN_ERROR;
  name = 'ForbiddenError';

  constructor(message?: string) {
    super(message);

    if (!this.message) {
      this.message = ERROR_FORBIDDEN;
    }
  }
};

export default ForbiddenError;
