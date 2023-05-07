import { ERROR_SERVER_INTERNAL } from '../config/constants';

export const COMMON_SERVER_ERROR_CODE = 500;

class CommonServerError extends Error {
  statusCode = COMMON_SERVER_ERROR_CODE;
  name = 'CommonServerError';

  constructor(message?: string) {
    super(message);

    if (!this.message) {
      this.message = ERROR_SERVER_INTERNAL;
    }
  }
};

export default CommonServerError;
