import { rule, shield } from "graphql-shield";
import AppGraphQLError from './AppGraphQLError';
import { ERROR_WRONG_EMAIL_PASSWORD } from '../config/constants';
import { AUTH_ERROR_CODE } from '../errors/AuthError';

const isAuthenticated = rule()((_, __, { user }) => {
  return !user ? new AppGraphQLError(ERROR_WRONG_EMAIL_PASSWORD, AUTH_ERROR_CODE) : true;
});

export default shield({
  Query: {
    currentUser: isAuthenticated,
    movies: isAuthenticated,
  },
  Mutation: {
    updateUser: isAuthenticated,
    createMovie: isAuthenticated,
    deleteMovie: isAuthenticated,
  }
}, {allowExternalErrors: true});