import AppGraphQLError from './AppGraphQLError';
import { AllError } from '../types/error';
import { ERROR_VALIDATION, ERROR_RECORD_EXIST, ERROR_SERVER_INTERNAL } from '../config/constants';
import { MongoError } from 'mongodb';
import { COMMON_SERVER_ERROR_CODE } from '../errors/CommonServerError';
import { VALIDATION_ERROR_CODE } from '../errors/ValidationError';
import { CONFLICT_ERROR_CODE } from '../errors/ConflictError';

export const handleError = (err: AllError) => {
  if ('statusCode' in err && err.statusCode) {
    throw new AppGraphQLError(err.name, err.statusCode);
  }

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    throw new AppGraphQLError(`${ERROR_VALIDATION}: ${err.message}`, VALIDATION_ERROR_CODE)
  }

  if (err.name.toLowerCase().includes('mongo') && (err as MongoError).code === 11000) {
    throw new AppGraphQLError(ERROR_RECORD_EXIST, CONFLICT_ERROR_CODE)
  }

  throw new AppGraphQLError(ERROR_SERVER_INTERNAL, COMMON_SERVER_ERROR_CODE);
}