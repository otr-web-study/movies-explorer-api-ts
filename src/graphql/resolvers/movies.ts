import { getMovies, createMovie, deleteMovie } from '../../sharedControllers/movies';
import { handleError } from '../errorHandlers';
import { AllError } from '../../types/error';
import { IAuthPayload } from '../../types/auth';
import { IMovie } from '../../types/models';
import { MESSAGE_MOVIE_DELETED } from '../../config/constants';

interface CreateMovieArgs {
  data: Omit<IMovie, '_id' | 'owner'>
}

export default {
  Query: {
    async movies(_: unknown, __: unknown, {user}: {user: IAuthPayload}) {
      try {
        return await getMovies(user._id);
      } catch (err) {
        handleError((err as AllError));
      }
    }
  },
  Mutation: {
    async createMovie(_: unknown, {data}: CreateMovieArgs, {user}: {user: IAuthPayload}) {
      try {
        return await createMovie({
          ...data,
          owner: user._id
        })
      } catch (err) {
        handleError((err as AllError));
      }
    },
    async deleteMovie(_: unknown, {_id}: {_id: string}, {user}: {user: IAuthPayload}) {
      try {
        await deleteMovie(_id, user._id);
        return {message: MESSAGE_MOVIE_DELETED};
      } catch (err) {
        handleError((err as AllError));
      }
    }
  },
}