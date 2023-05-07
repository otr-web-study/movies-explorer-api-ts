import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import { handleObjectNotFound } from '../utils/utils';
import { AuthRequest, UpdateUserRequest } from '../types/requests';
import { createNewUser, login as sharedLogin } from '../sharedControllers/users';
import { IUser } from '../types/models';

export const getCurrentUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  const userId = req.user._id;

  User.findById(userId)
    .then(handleObjectNotFound)
    .then((user) => res.send(user))
    .catch(next);
};

export const updateUser = (req: UpdateUserRequest, res: Response, next: NextFunction) => {
  const data = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, data, {
    new: true, runValidators: true,
  })
    .then(handleObjectNotFound)
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
