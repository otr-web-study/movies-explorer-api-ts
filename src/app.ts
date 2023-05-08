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
import { createRouter } from './routes';


interface MyConnectOptions extends ConnectOptions {
  useNewUrlParser: boolean,
  useUnifiedTopology: boolean,
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
  
  app.use(requestLogger);
  app.use(rateLimiter);
  app.use(cors);
  app.use(bodyParser.json());
  app.use(helmet());

  const router = await createRouter(httpServer);
  app.use('/', router);
  
  app.use(errorLogger);
  app.use(errors());
  app.use(centralizedErrorHandler);
  
  await new Promise<void>((resolve) => httpServer.listen({ port: parseInt(PORT) }, resolve));
  console.log(`App listening on port ${PORT}`);
}

main()
