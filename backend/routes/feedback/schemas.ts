import * as joi from 'joi';

// regex for feedback labels
const feedbackLabelRegex = new RegExp(/feedback|abuse|bug/i);

// schema for request body for sending feedback
export const NewFeedback = joi.object().keys({
  message: joi.string().max(130).required(),
  label: joi
    .string()
    .pattern(feedbackLabelRegex)
    .required()
    .default('feedback'),
});
