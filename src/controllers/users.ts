import { NextFunction, Request, Response } from 'express';
import { AuthRequest, UpdateUserRequest } from '../types/requests';
import { 
  createNewUser,
  login as sharedLogin,
  getCurrentUser as sharedGetCurrentUser,
  updateUser as sharedUpdateUser,
} from '../sharedControllers/users';
import { IUser } from '../types/models';

export const getCurrentUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  const userId = req.user._id;

  sharedGetCurrentUser(userId)
    .then((user) => res.send(user))
    .catch(next);
};

export const updateUser = (req: UpdateUserRequest, res: Response, next: NextFunction) => {
  const data = req.body;
  const userId = req.user._id;

  sharedUpdateUser(userId, data)
    .then((user) => res.send(user))
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, email, password,
  } = <IUser>req.body;

  createNewUser(name, email, password)
    .then((user) => res.status(201).send(user))
    .catch(next);
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = <Omit<IUser, 'name'>>req.body;

  sharedLogin(email, password)
    .then(data => res.send(data))
    .catch(next);
};
