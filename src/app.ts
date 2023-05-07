import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { errors } from 'celebrate';
import http from 'http';

import {
  PORT, MONGO_ADDR, MONGO_PORT, DB_NAME,
} from './config/config';
import { requestLogger, errorLogger } from './middlewares/logger';
import cors from './middlewares/cors';
import centralizedErrorHandler from './middlewares/centralizedErrorHandler';
import rateLimiter from './middlewares/rateLimiter';
import router from './routes';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { IAuthPayload } from './types/auth';
import { AuthRequest } from './types/requests';

interface MyConnectOptions extends ConnectOptions {
  useNewUrlParser: boolean,
  useUnifiedTopology: boolean,
}

interface ApolloContext {
  user: IAuthPayload,
}

const connectOptions: MyConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const main = async () => {
  const app = express();
  
  try {
    await mongoose.connect(
      `mongodb://${MONGO_ADDR}:${MONGO_PORT}/${DB_NAME}`,
      connectOptions
    )
  } catch (err) {
    console.log(err);
    return
  }

  const httpServer = http.createServer(app);

  const server = new ApolloServer<ApolloContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  
  app.use(requestLogger);
  app.use(rateLimiter);
  app.use(cors);
  app.use(bodyParser.json());
  app.use(helmet());

  app.use('/graphql', expressMiddleware(server, {
    context: async ({req}) => {
      return {
        user: (req as AuthRequest).user,
      }
    }
  }))
  
  app.use('/', router);
  
  app.use(errorLogger);
  app.use(errors());
  app.use(centralizedErrorHandler);
  
  app.listen(parseInt(PORT), () => {
    console.log(`App listening on port ${PORT}`);
  });
}

main()
