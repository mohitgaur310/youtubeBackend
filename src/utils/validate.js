const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().lowercase().required(),
  email: Joi.string().email().required(),
  fullname: Joi.string().required(),
  password: Joi.string().required(),
});

const loginEmail = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().required(),
});

const loginUsername = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
module.exports = { userSchema, loginEmail, loginUsername };
