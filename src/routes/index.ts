import { RequestHandler, Router } from "express";
import { Server } from 'http';
import usersRouter from './users';
import moviesRouter from './movies';
import authRouter from './auth';
import ObjectNotFoundError from '../errors/ObjectNotFoundError';
import { ERROR_WRONG_PATH } from '../config/constants';
import { auth , checkAuth } from '../middlewares/auth';
import { createGraphqlMiddleware } from '../middlewares/graphql';

export const createRouter = async (httpServer: Server) => {
  const router = Router();
  
  router.use((auth as RequestHandler));
  
  const graphqlMiddleware = await createGraphqlMiddleware({httpServer});
  router.use('/graphql', graphqlMiddleware);

  router.use('/', authRouter);
  
  router.use((checkAuth as RequestHandler));
  
  router.use('/users', usersRouter);
  router.use('/movies', moviesRouter);
  router.all('*', (req, res, next) => {
    next(new ObjectNotFoundError(ERROR_WRONG_PATH));
  });

  return router;
}