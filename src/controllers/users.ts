import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { handleObjectNotFound } from '../utils/utils';
import { secret } from '../config/config';
import { AuthRequest, UpdateUserRequest } from '../types/requests';
import { NextFunction, Request, Response } from 'express';
import { IUser } from '../types/models';

export const getCurrentUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  const userId = (req.user as IUser)._id;

  User.findById(userId)
    .then(handleObjectNotFound)
    .then((user) => res.send(user))
    .catch(next);
};

export const updateUser = (req: UpdateUserRequest, res: Response, next: NextFunction) => {
  const { name, email } = req.body;
  const userId = (req.user as IUser)._id;

  User.findByIdAndUpdate(userId, { name, email }, {
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

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      res.status(201).send(userObj);
    })
    .catch(next);
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = <Omit<IUser, 'name'>>req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        secret,
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch(next);
};
