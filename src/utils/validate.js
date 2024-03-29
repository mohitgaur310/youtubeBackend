const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().lowercase().required(),
  email: Joi.string().email().required(),
  fullname: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { userSchema };
