import dotenv from 'dotenv';

dotenv.config();

export const {
  JWT_SECRET: secret = 'some-secret-key',
  PORT = '3000',
  NODE_ENV = 'develop',
  MONGO_ADDR = 'localhost',
  MONGO_PORT = '27017',
  DB_NAME = 'moviesdb',
} = process.env;
