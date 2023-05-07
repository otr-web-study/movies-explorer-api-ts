import { RequestHandler, Router } from "express";
import usersRouter from './users';
import moviesRouter from './movies';
import authRouter from './auth';
import ObjectNotFoundError from '../errors/ObjectNotFoundError';
import { ERROR_WRONG_PATH } from '../config/constants';
import { auth , checkAuth } from '../middlewares/auth';

const router = Router();

router.use((auth as RequestHandler));

router.use('/', authRouter);

router.use((checkAuth as RequestHandler));

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.all('*', (req, res, next) => {
  next(new ObjectNotFoundError(ERROR_WRONG_PATH));
});

export default router;
