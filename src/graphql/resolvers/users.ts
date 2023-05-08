import {
  createNewUser,
  login,
  getCurrentUser,
  updateUser,
} from '../../sharedControllers/users';
import { handleError } from '../errorHandlers';
import { AllError } from '../../types/error';
import { IAuthPayload } from '../../types/auth';
import { IUser } from '../../types/models';

interface CreateUserArgs {
  data: IUser
}
interface LoginArgs {
  data: Omit<IUser, 'name'>
}
interface UdpateUserArgs {
  data: Omit<IUser, 'password'>
}

export default {
  Query: {
    async currentUser(_: unknown, __: unknown, {user}: {user: IAuthPayload}) {
      try {
        return await getCurrentUser(user._id);
      } catch (err) {
        handleError(err as AllError);
      }
    }
  },
  Mutation: {
    async register(_: unknown, {data: {email, name, password}}: CreateUserArgs) {
      try {
        return await createNewUser(name, email, password);
      } catch (err) {
        handleError(err as AllError);
      }
    },
    async login(_: unknown, {data: {email, password}}: LoginArgs) {
      try {
        return await login(email, password);
      } catch (err) {
        handleError(err as AllError)
      }
    },
    async updateUser(_: unknown, {data}: UdpateUserArgs, {user}: {user: IAuthPayload}) {
      try {
        return updateUser(user._id, data);
      } catch (err) {
        handleError(err as AllError)
      }
    },
  },
}