import * as joi from 'joi';

// schema for a new key being created
export const NewKey = joi.object().keys({
  url: joi.string().uri().required(),
  expiration: joi.number().min(5).max(60).required(),
});

// schema for a new report being created
export const NewReport = joi.object().keys({
  message: joi.number().max(130).default(''),
});
