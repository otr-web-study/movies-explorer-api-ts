import { ERROR_OBJECT_NOT_FOUND } from '../config/constants';

export const NOT_FOUND_ERROR_CODE = 404;

class ObjectNotFoundError extends Error {
  statusCode = NOT_FOUND_ERROR_CODE;
  name = 'ObjectNotFoundError';

  constructor(message?: string) {
    super(message);

    if (!this.message) {
      this.message = ERROR_OBJECT_NOT_FOUND;
    }
  }
};

export default ObjectNotFoundError;
