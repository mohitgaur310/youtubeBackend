const { Router } = require("express");
const { refreshAccessToken } = require("../controllers/token.controller.js");

const router = Router();

router.route("/refresh").post(refreshAccessToken);

module.exports = router;
