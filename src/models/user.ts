import { Schema, model, Model }from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { handleObjectNotFound } from '../utils/utils';
import AuthError from '../errors/AuthError';
import {
  ERROR_REQUIRED_FIELD, ERROR_MIN_LENGTH, ERROR_MAX_LENGTH, ERROR_UNIQ_EMAIL, ERROR_WRONG_EMAIL,
} from '../config/constants';
import { IUser } from '../types/models';

const { isEmail } = validator;


interface UserModelType extends Model<IUser> {
  findUserByCredentials(email: string, password: string): Promise<IUser>,
};

const userSchema = new Schema<IUser, UserModelType>({
  name: {
    type: String,
    required: [true, ERROR_REQUIRED_FIELD],
    minlength: [2, `${ERROR_MIN_LENGTH}${2}`],
    maxlength: [30, `${ERROR_MAX_LENGTH}${30}`],
  },
  email: {
    type: String,
    required: [true, ERROR_REQUIRED_FIELD],
    unique: true,
    validate: [isEmail, ERROR_WRONG_EMAIL],
  },
  password: {
    type: String,
    required: [true, ERROR_REQUIRED_FIELD],
    select: false,
  },
}, { versionKey: false });


userSchema.statics.findUserByCredentials = function findUserByCredentials(
  this: UserModelType,
  email: string,
  password: string
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => handleObjectNotFound(user, true))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new AuthError());
        }
        return user;
      }));
}


const user = model<IUser, UserModelType>('user', userSchema);

export default user;
