const { asyncHandler } = require("../utils/asyncHandler");

const registerUser = asyncHandler(async (req, res) => {
  console.log("in the function");
  return res.status(200).json({
    message: "ok",
  });
});

module.exports = { registerUser };
