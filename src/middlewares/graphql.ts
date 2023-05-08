import { ApolloServer } from '@apollo/server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { Server } from 'http';
import { applyMiddleware } from "graphql-middleware";

import typeDefs from '../graphql/typeDefs';
import resolvers from '../graphql/resolvers';
import { IAuthPayload } from '../types/auth';
import { AuthRequest } from '../types/requests';
import permissions from '../graphql/permissions';

interface ApolloContext {
  user: IAuthPayload,
}

interface CreateOptions {
  httpServer: Server
}

export const createGraphqlMiddleware = async ({ httpServer }: CreateOptions) => {
  const server = new ApolloServer<ApolloContext>({
    schema: applyMiddleware(
      makeExecutableSchema({ typeDefs, resolvers}),
      permissions
    ),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  return expressMiddleware(server, {
    context: async ({req}) => {
      return {
        user: (req as AuthRequest).user,
      }
    }
  });
}