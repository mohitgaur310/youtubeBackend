const { generateRefreshToken } = require("../utils/handler");
const RefreshToken = require("../models/refreshToken.model");

const createRefreshToken = async (id) => {
  const refreshToken = generateRefreshToken({ _id: id });
  const response = await RefreshToken.create({
    user: id,
    refreshToken: refreshToken,
  });
  return response.refreshToken;
};

module.exports = { createRefreshToken };
