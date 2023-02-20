import mongoose from 'mongoose';
import validator from 'validator';
import { ERROR_REQUIRED_FIELD, ERROR_WRONG_URL } from '../config/constants';
import { IMovie } from '../types/models';

const { isURL } = validator;

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, ERROR_REQUIRED_FIELD],
  },
  director: {
    type: String,
    required: [true, ERROR_REQUIRED_FIELD],
  },
  duration: {
    type: Number,
    required: [true, ERROR_REQUIRED_FIELD],
  },
  year: {
    type: String,
    required: [true, ERROR_REQUIRED_FIELD],
  },
  description: {
    type: String,
    required: [true, ERROR_REQUIRED_FIELD],
  },
  image: {
    type: String,
    required: [true, ERROR_REQUIRED_FIELD],
  },
  trailerLink: {
    type: String,
    required: [true, ERROR_REQUIRED_FIELD],
    validate: [isURL, ERROR_WRONG_URL],
  },
  thumbnail: {
    type: String,
    required: [true, ERROR_REQUIRED_FIELD],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: [true, ERROR_REQUIRED_FIELD],
  },
  nameRU: {
    type: String,
    required: [true, ERROR_REQUIRED_FIELD],
  },
  nameEN: {
    type: String,
    required: [true, ERROR_REQUIRED_FIELD],
  },
}, { versionKey: false });
movieSchema.index({ owner: 1, movieId: 1 }, { unique: true });

export default mongoose.model<IMovie>('movie', movieSchema);
