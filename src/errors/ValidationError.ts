import { ERROR_VALIDATION } from '../config/constants';

class ValidationError extends Error {
  statusCode = 400;
  name = 'ValidationError';

  constructor(message?: string) {
    super(message);

    if (!this.message) {
      this.message = ERROR_VALIDATION;
    }
  }
};

export default ValidationError;
