const { generateRefreshToken } = require("../utils/handler");
const RefreshToken = require("../models/refreshToken.model");
const User = require("../models/User.model.js");

const createRefreshToken = async (id) => {
  const refreshToken = generateRefreshToken({ _id: id });

  const response = await RefreshToken.create({
    user: id,
    refreshToken: refreshToken,
  });
  return response.refreshToken;
};

const getRefreshToken = async (id) => {
  const response = await RefreshToken.find({ user: id });
  return response[0].refreshToken;
};

const updateAccessToken = async (id, accessToken) => {
  const updated = await User.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        accessToken: accessToken,
      },
    },
    { new: true },
  );

  return updated;
};
module.exports = { createRefreshToken, getRefreshToken, updateAccessToken };
