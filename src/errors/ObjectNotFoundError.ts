import { ERROR_OBJECT_NOT_FOUND } from '../config/constants';

class ObjectNotFoundError extends Error {
  statusCode = 404;
  name = 'ObjectNotFoundError';

  constructor(message?: string) {
    super(message);

    if (!this.message) {
      this.message = ERROR_OBJECT_NOT_FOUND;
    }
  }
};

export default ObjectNotFoundError;
