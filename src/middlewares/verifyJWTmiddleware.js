const UserModel = require("../models/User.model");
const { asyncHandler } = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    console.log("middleware");
    const token =
      req.cookies.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) return res.status(401).json({ error: "Unauthorized request" });

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = UserModel.findOne({ username: decodedToken.username }).select(
      "-password -accessToken",
    );
    if (!user) return res.sendStatus(404).json({ message: "Invalid token" });

    req.user = user;
    console.log(user);
    next();
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = { verifyJWT };
