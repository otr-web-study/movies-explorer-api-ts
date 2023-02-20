import ValidationError from '../errors/ValidationError';
import CommonServerError from '../errors/CommonServerError';
import ConflictError from '../errors/ConflictError';
import { MESSAGE_ERROR_HAPPENED, ERROR_VALIDATION } from '../config/constants';
import { MongoError } from 'mongodb';
import { AllError } from '../types/error';
import { NextFunction, Request, Response } from 'express';

const handleError = (err: AllError) => {
  if ('statusCode' in err && err.statusCode) {
    return err;
  }

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return new ValidationError(`${ERROR_VALIDATION}: ${err.message}`);
  }

  if (err.name === 'MongoError' && (err as MongoError).code === 11000) {
    return new ConflictError();
  }

  return new CommonServerError();
};

const errorHandler = (err: AllError, _: Request, res: Response, next: NextFunction) => {
  const { statusCode, message } = handleError(err);

  res.status(statusCode).send({
    message: `${MESSAGE_ERROR_HAPPENED}${message}`,
  });
  next();
};

export default errorHandler;
