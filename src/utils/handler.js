const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateJwtToken = (payload) => {
  const options = { expiresIn: process.env.ACCESS_TOKEN_EXPIRY };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECERT, options);
};

const generateRefreshToken = () => {
  const options = { expiresIn: process.env.ACCESS_TOKEN_EXPIRY };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECERT, options);
};

const bcryptPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
};

const compareBcryptPassword = async (password, hashPassword) => {
  bcrypt.compare(password, hashPassword, (error, result) => {
    return result;
  });
};
module.exports = {
  generateJwtToken,
  generateRefreshToken,
  bcryptPassword,
  compareBcryptPassword,
};
