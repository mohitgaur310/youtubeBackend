const { Router } = require("express");
const { registerUser, loginUser } = require("../controllers/user.controller");
const upload = require("../middlewares/multer");

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "avatar", maxCount: 1 },
  ]),
  registerUser,
);

router.route("/login").post(loginUser);

module.exports = router;
