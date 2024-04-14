const User = require("../models/User.model.js");
const { asyncHandler } = require("../utils/asyncHandler.js");
const jwt = require("jsonwebtoken");
const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) return res.status(401).json({ error: "Unauthorized request" });

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECERT);

    const user = await User.findById(decodedToken._id).select(
      "-password -accessToken",
    );

    if (!user) return res.sendStatus(404).json({ message: "Invalid token" });

    req.user = user;

    next();
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = { verifyJWT };
