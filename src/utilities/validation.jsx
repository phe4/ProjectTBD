import Joi from 'joi';

const eventSchema = Joi.object({
  title: Joi.string().min(1).required().messages({
    'string.empty': 'Title is required',
  }),
  description: Joi.string().min(1).required().messages({
    'string.empty': 'Description is required',
  }),
  topic: Joi.string().min(1).required().messages({
    'string.empty': 'Topic is required',
  }),
  // datetime example: 10/31/23, 5:58 PM
  datetime: Joi.string().pattern(new RegExp(/^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/[0-9]{2}, (0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/)).required().messages({
    'string.empty': 'Time is required',
    'string.pattern.base': 'Time format should be MM/DD/YY , HH:mm AM/PM',
  }),
  location: Joi.string().min(1).required().messages({
    'string.empty': 'Location is required',
  }),
  capacity: Joi.number().integer().min(1).required().messages({
    'number.base': 'Capacity should be a number',
    'number.empty': 'Capacity is required',
    'number.integer': 'Capacity should be an integer',
  }),
  latLng: Joi.object({
    lat: Joi.number().min(-90).max(90).required().messages({
      'number.base': 'Latitude should be a number',
      'number.empty': 'Latitude is required',
    }),
    lng: Joi.number().min(-180).max(180).required().messages({
      'number.base': 'Longitude should be a number',
      'number.empty': 'Longitude is required',
    })
  }).required().messages({
    'object.base': 'LatLng should be an object with lat and lng properties',
    'any.required': 'LatLng is required',
  }),
});

export const validateEvent = (event) => {
  const { error } = eventSchema.validate(event, { abortEarly: false });
  if (error) {
    // Convert Joi error object to your error object format
    const errors = {};
    error.details.forEach(detail => {
      const key = detail.context.key;
      errors[key] = detail.message;
    });
    return errors;
  }
  return null;
};