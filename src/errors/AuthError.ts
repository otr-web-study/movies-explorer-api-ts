import { ERROR_WRONG_EMAIL_PASSWORD } from '../config/constants';

export const AUTH_ERROR_CODE = 401;

class AuthError extends Error{
  statusCode = AUTH_ERROR_CODE;
  name = 'AuthError';

  constructor(message?: string) {
    super(message);
    if (!this.message) {
      this.message = ERROR_WRONG_EMAIL_PASSWORD;
    }
  }
};

export default AuthError;
