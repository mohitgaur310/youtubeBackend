const { Router } = require("express");
const { registerUser } = require("../controllers/user.controller");
const upload = require("../middlewares/multer");

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "avatar", maxCount: 1 },
  ]),
  registerUser,
);

module.exports = router;