import { ERROR_SERVER_INTERNAL } from '../config/constants';

class CommonServerError extends Error {
  statusCode = 500;
  name = 'CommonServerError';

  constructor(message?: string) {
    super(message);

    if (!this.message) {
      this.message = ERROR_SERVER_INTERNAL;
    }
  }
};

export default CommonServerError;
