import { createNewUser, login } from '../../sharedControllers/users';
import { handleError } from '../errorHandlers';
import { AllError } from '../../types/error';

interface CreateUserArgs {
  data: {
    name: string,
    email: string,
    password: string,
  }
}

interface LoginArgs extends Omit<CreateUserArgs, 'name'> {}

export default {
  Query: {
    async currentUser(_: unknown, __: unknown, {user}) {
      console.log(user)
      return JSON.stringify({ name: {_id: "342", name: 'lskd', email: 'sdfk'}})
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
    }
  },
}