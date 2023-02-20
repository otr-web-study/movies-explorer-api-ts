import { Joi } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import validator from 'validator';
import ValidationError from '../errors/ValidationError';
import { ERROR_WRONG_ID, ERROR_WRONG_URL } from '../config/constants';
import { Ids } from '../types/ids';

const { isURL } = validator;

function validateId(value: Ids) {
  if (!isValidObjectId(value)) {
    throw new ValidationError(ERROR_WRONG_ID);
  }
  return value;
}

function validateURL(value: string) {
  if (!isURL(value)) {
    throw new ValidationError(ERROR_WRONG_URL);
  }
  return value;
}

export const ruleCreateMovie = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    trailerLink: Joi.string().required().custom(validateURL),
    thumbnail: Joi.string().required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};

export const ruleParamsContainsId = {
  params: Joi.object().keys({
    _id: Joi.string().required().custom(validateId),
  }),
};
