const { Router } = require("express");
const {
  registerUser,
  loginUser,
  logout,
} = require("../controllers/user.controller");
const upload = require("../middlewares/multer");
const { verifyJWT } = require("../middlewares/verifyJWTmiddleware");

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "avatar", maxCount: 1 },
  ]),
  registerUser,
);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logout);

module.exports = router;
