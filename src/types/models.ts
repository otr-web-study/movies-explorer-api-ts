import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string,
  email: string,
  password: string,
}

export interface IMovie extends Document {
  country: string,
  director: string,
  duration: number,
  year: string,
  description: string,
  image: string,
  trailerLink: string,
  thumbnail: string,
  owner: IUser['_id'],
  movieId: number,
  nameRU: string,
  nameEN: string,
}
