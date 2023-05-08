import userResolvers from './users';
import moviesResolvers from './movies';

export default {
  Query: {
    ...userResolvers.Query,
    ...moviesResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...moviesResolvers.Mutation,
  },
}