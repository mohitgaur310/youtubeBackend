const jwt = require("jsonwebtoken");
const { asyncHandler } = require("../utils/asyncHandler");
const { error } = require("../utils/response");
const { generateJwtToken } = require("../utils/handler");
const User = require("../models/User.model.js");

const refreshAccessToken = asyncHandler(async (req, res, next) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken)
      return res.status(400).json({ error: "Unauthorized required" });

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECERT,
    );
    const user = await User.findById(decodedToken._id);
    if (!user) return res.status(400).json({ error: "Unauthorized required" });
    const accessToken = generateJwtToken({ _id: decodedToken._id });
    let options = {
      maxAge: 20 * 60 * 10000,
      httpOnly: true,
    };
    res.cookies("accessToken", accessToken, options);
    return res
      .status(200)
      .json({ success: true, data: { accessToken: accessToken } });
  } catch (error) {
    next(error);
  }
});

module.exports = { refreshAccessToken };
