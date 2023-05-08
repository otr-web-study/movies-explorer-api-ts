import { MESSAGE_MOVIE_DELETED } from '../config/constants';
import { AuthRequest, CreateMovieRequest, DeleteMovieRequest } from '../types/requests';
import { NextFunction, Response } from 'express';
import {
  getMovies as sharedGetMovies,
  createMovie as sharedCreateMovie,
  deleteMovie as sharedDeleteMovie,
} from '../sharedControllers/movies';

export const getMovies = (req: AuthRequest, res: Response, next: NextFunction) => {
  const owner = req.user._id;

  sharedGetMovies(owner)
    .then((movie) => res.send(movie))
    .catch(next);
};

export const createMovie = (req: CreateMovieRequest, res: Response, next: NextFunction) => {
  const data = req.body;
  const owner = req.user._id;

  sharedCreateMovie({
    ...data,
    owner
  })
    .then((movie) => res.status(201).send(movie))
    .catch(next);
};

export const deleteMovie = (req: DeleteMovieRequest, res: Response, next: NextFunction) => {
  const { _id } = req.params;
  const owner = req.user._id;

  sharedDeleteMovie(_id, owner)
    .then(() => res.send({ message: MESSAGE_MOVIE_DELETED }))
    .catch(next);
};
