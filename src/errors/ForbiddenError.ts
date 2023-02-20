import { ERROR_FORBIDDEN } from '../config/constants';

class ForbiddenError extends Error {
  statusCode = 403;
  name = 'ForbiddenError';

  constructor(message?: string) {
    super(message);

    if (!this.message) {
      this.message = ERROR_FORBIDDEN;
    }
  }
};

export default ForbiddenError;
