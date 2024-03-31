const jwt = require("jsonwebtoken");

const generateJwtToken = (payload) => {
  const options = { expiresIn: process.env.ACCESS_TOKEN_EXPIRY };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECERT, options);
};

const generateRefreshToken = () => {
  const options = { expiresIn: process.env.ACCESS_TOKEN_EXPIRY };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECERT, options);
};

module.exports = { generateJwtToken, generateRefreshToken };
