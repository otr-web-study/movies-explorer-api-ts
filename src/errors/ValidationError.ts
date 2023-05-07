import { ERROR_VALIDATION } from '../config/constants';

export const VALIDATION_ERROR_CODE = 400;

class ValidationError extends Error {
  statusCode = VALIDATION_ERROR_CODE;
  name = 'ValidationError';

  constructor(message?: string) {
    super(message);

    if (!this.message) {
      this.message = ERROR_VALIDATION;
    }
  }
};

export default ValidationError;
