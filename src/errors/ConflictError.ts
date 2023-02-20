import { ERROR_RECORD_EXIST } from '../config/constants';

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