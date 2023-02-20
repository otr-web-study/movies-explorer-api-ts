import { Request } from "express";
import { IMovie, IUser } from "./models";

export interface AuthRequest<P={}, ResBody={}, ReqBody={}, ReqQuery=any> extends Request<P, ResBody, ReqBody, ReqQuery> {
  user: IUser | string;
}

export interface CreateMovieRequest extends AuthRequest<{}, IMovie, Omit<IMovie, 'owner'>> {}

export interface DeleteMovieRequest extends AuthRequest<{_id: IMovie['_id']}> {}

export interface UpdateUserRequest extends AuthRequest<{}, IUser, Omit<IUser, 'password'>> {}
