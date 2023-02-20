import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { errors } from 'celebrate';

import {
  PORT, MONGO_ADDR, MONGO_PORT, DB_NAME,
} from './config/config';
import { requestLogger, errorLogger } from './middlewares/logger';
import cors from './middlewares/cors';
import centralizedErrorHandler from './middlewares/centralizedErrorHandler';
import rateLimiter from './middlewares/rateLimiter';
import router from './routes';

interface MyConnectOptions extends ConnectOptions {
  useNewUrlParser: boolean,
  useUnifiedTopology: boolean,
}
const connectOptions: MyConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const app = express();
mongoose.connect(
  `mongodb://${MONGO_ADDR}:${MONGO_PORT}/${DB_NAME}`,
  connectOptions
).catch((err) => console.log(err));

app.use(requestLogger);
app.use(rateLimiter);
app.use(cors);
app.use(bodyParser.json());
app.use(helmet());

app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(centralizedErrorHandler);

app.listen(parseInt(PORT), () => {
  console.log(`App listening on port ${PORT}`);
});
