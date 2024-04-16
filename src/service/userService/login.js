const { response } = require("express");
const {
  compareBcryptPassword,
  generateJwtToken,
} = require("../../utils/handler.js");
const { error, success } = require("../../utils/response.js");
const { createRefreshToken, getRefreshToken } = require("../token.service.js");
const User = (require = require("../../models/User.model"));

const loginService = async ({ email, password }) => {
  const existingUsesr = await User.findOne({
    $or: [{ email: email }, { username: email }],
  });

  const accessToken = generateJwtToken({ _id: existingUsesr._id });
  const refreshToken = getRefreshToken(existingUsesr._id);
  const newUser = await User.findByIdAndUpdate(
    { _id: existingUsesr._id },
    { $set: { accessToken: accessToken } },
    { new: true },
  );
  if (!existingUsesr) return error(404, "email doesn't exists!!! ");

  const pass = await compareBcryptPassword(password, existingUsesr.password);

  if (!pass) return error(404, "Password doesn't match");

  return success({
    username: newUser.username,
    fullname: newUser.fullname,
    accessToken: newUser.accessToken,
    avatar: newUser.avatar,
    coverImage: newUser.coverImage,
    refreshToken: refreshToken,
  });
};

module.exports = { loginService };
