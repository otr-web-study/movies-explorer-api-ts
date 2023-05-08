import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { secret } from '../config/config';
import { handleObjectNotFound } from '../utils/utils';
import { IUser, RespondUser } from '../types/models';


type OmitUser = Omit<IUser, 'password'> & Partial<Pick<IUser, 'password'>>

export const createNewUser = (name: string, email: string, password: string): Promise<RespondUser> => {
  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      const userObj: OmitUser = user.toObject();
      delete userObj.password;
      return userObj;
    });
}

export const login = (email: string, password: string): Promise<{token: string}> => {
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        secret,
        { expiresIn: '7d' },
      );

      return ({ token });
    });
}

export const getCurrentUser = (userId: string) => {
  return User.findById(userId)
    .then(handleObjectNotFound);
}

export const updateUser = (userId: string, data: Omit<IUser, 'password'>) => {
  return User.findByIdAndUpdate(userId, data, {
    new: true, runValidators: true,
  })
    .then(handleObjectNotFound);
}