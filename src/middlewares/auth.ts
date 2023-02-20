import { Response, NextFunction } from 'express';

import { AuthRequest } from '../types/requests';
import jwt from 'jsonwebtoken';
import AuthError from '../errors/AuthError';
import { secret } from '../config/config';
import { MESSAGE_NEEDS_AUTHORIZATION, MESSAGE_WRONG_JWT } from '../config/constants';
import { IUser } from '../types/models';

const auth = (req: AuthRequest, _: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(MESSAGE_NEEDS_AUTHORIZATION);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, secret) as IUser;
  } catch (err) {
    throw new AuthError(MESSAGE_WRONG_JWT);
  }

  req.user = payload;
  next();
};

export default auth;
