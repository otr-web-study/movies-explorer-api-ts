import { ERROR_WRONG_EMAIL_PASSWORD } from '../config/constants';


class AuthError extends Error{
  statusCode = 401;
  name = 'AuthError';

  constructor(message?: string) {
    super(message);
    if (!this.message) {
      this.message = ERROR_WRONG_EMAIL_PASSWORD;
    }
  }
};

export default AuthError;
