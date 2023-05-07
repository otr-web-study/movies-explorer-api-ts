import Movie from '../models/movie';
import { handleObjectNotFound, isCurrentUserOwner } from '../utils/utils';
import { MESSAGE_MOVIE_DELETED } from '../config/constants';
import { AuthRequest, CreateMovieRequest, DeleteMovieRequest } from '../types/requests';
import { NextFunction, Response } from 'express';

export const getMovies = (req: AuthRequest, res: Response, next: NextFunction) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movie) => res.send(movie))
    .catch(next);
};

export const createMovie = (req: CreateMovieRequest, res: Response, next: NextFunction) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(201).send(movie))
    .catch(next);
};

export const deleteMovie = (req: DeleteMovieRequest, res: Response, next: NextFunction) => {
  const { _id } = req.params;

  Movie.findById(_id)
    .then(handleObjectNotFound)
    .then((movie) => isCurrentUserOwner(req, movie))
    .then((movie) => movie.remove())
    .then(() => res.send({ message: MESSAGE_MOVIE_DELETED }))
    .catch(next);
};
