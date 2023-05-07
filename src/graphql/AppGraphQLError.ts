import { GraphQLError } from 'graphql';

class AppGraphQLError extends GraphQLError {
  constructor(message: string, code: number) {
    super(message, {
      extensions: {
        code,
      }
    })
  }
}

export default AppGraphQLError;