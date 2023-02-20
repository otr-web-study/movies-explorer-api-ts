import ValidationError from '../errors/ValidationError';
import CommonServerError from '../errors/CommonServerError';
import ConflictError from '../errors/ConflictError';
import { MongoError } from 'mongodb';

export type AllError = ValidationError | CommonServerError | ConflictError | MongoError;
export type AppError = ValidationError | CommonServerError | ConflictError;