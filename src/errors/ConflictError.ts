import { ERROR_RECORD_EXIST } from '../config/constants';

export const CONFLICT_ERROR_CODE = 409;

class ConflictError extends Error {
  statusCode = 409;
  name = 'ConflictError';

  constructor(message?: string) {
    super(message);

    if (!this.message) {
      this.message = ERROR_RECORD_EXIST;
    }
  }
};

export default ConflictError;