import Movie from '../models/movie';
import { handleObjectNotFound, isCurrentUserOwner } from '../utils/utils';
import { IMovie } from '../types/models';

export const getMovies = (owner: string) => {
  return Movie.find({ owner });
}

export const createMovie = (movie: IMovie) => {
  return Movie.create(movie);
}

export const deleteMovie = (_id: string, userId: string) => {
  return Movie.findById(_id)
    .then(handleObjectNotFound)
    .then((movie) => isCurrentUserOwner(userId, movie))
    .then((movie) => movie.remove());
}