const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().lowercase().required(),
  email: Joi.string().email().required(),
  fullname: Joi.string().required(),
  avatar: Joi.string().required(),
  coverImage: Joi.string(),
  password: Joi.string().required(),
});

module.exports = { userSchema };
