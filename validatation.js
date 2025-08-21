const Joi = require("joi");

const validateListing = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required"
  }),
  location: Joi.string().required().messages({
    "string.empty": "Location is required"
  }),
  country: Joi.string().required().messages({
    "string.empty": "Country is required"
  }),
  price: Joi.number().min(1).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price must be at least 1",
    "any.required": "Price is required"
  }),
  url: Joi.string().uri().required().messages({
    "string.empty": "Image URL is required",
    "string.uri": "Image URL must be a valid URL"
  }),
  description: Joi.string().required().messages({
    "string.empty": "Description is required"
  })
});

const validateReview = Joi.object({
  rating: Joi.number().required().messages({
    "any.required": "Rating is required to submit a review",
    "number.base": "Rating must be a number"
  }),
  comment: Joi.string().required().messages({
    "string.empty": "Comment is required to submit a review"
  })
});

module.exports = { validateReview, validateListing };
