import ObjectNotFoundError from '../errors/ObjectNotFoundError';
import ForbiddenError from '../errors/ForbiddenError';
import AuthError from '../errors/AuthError';
import { IUser, IMovie } from '../types/models';
import { AuthRequest } from '../types/requests';

type AppDocument = IUser | IMovie | null;

export const handleObjectNotFound = <T extends AppDocument>(obj: T, isAuth = false) => {
  if (!obj) {
    throw isAuth ? new AuthError() : new ObjectNotFoundError();
  }
  return obj;
};

export const isCurrentUserOwner = (req: AuthRequest, obj: IMovie) => {
  if (obj.owner._id.toString() !== (req.user as IUser)._id) {
    throw new ForbiddenError();
  }
  return obj;
};

