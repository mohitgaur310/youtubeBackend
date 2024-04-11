const {
  userSchema,
  loginEmail,
  loginUsername,
} = require("../utils/validate.js");
const { asyncHandler } = require("../utils/asyncHandler");
const { error } = require("../utils/response.js");
const uploadOnCloudinary = require("../utils/cloudinary.js");
const { register } = require("../service/userService/register");
const { loginService } = require("../service/userService/login.js");
const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const data = req.body;

    const { error, value } = userSchema.validate(data);

    if (error) {
      return res
        .status(400)
        .json({ error: `${error.details[0].message} validation error ` });
    }
    const avatarLocalPath = req.files.avatar[0]?.path;
    const coverImageLocalPath = req.files.coverImage[0]?.path;

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
      return res.status(500).json({ error: "Avatar image is required" });
    }

    const serviceReg = await register(value, avatar, coverImage);

    if (!serviceReg?.success)
      return res.status(400).json({ Response: serviceReg });

    return res.status(200).json({ Response: serviceReg });
  } catch (error) {
    next(error);
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const data = req.body;
    const loginType = data.email.endsWith("@gmail.com");
    let error, value;
    console.log(loginType);
    if (loginType) {
      ({ error, value } = loginEmail.validate(data));
    } else {
      ({ error, value } = loginUsername.validate(data));
    }

    if (error) {
      return res
        .status(400)
        .json({ error: `${error.details[0].message} validation error ` });
    }

    const serviceResponse = await loginService(value, loginType);

    return res.status(200).json({ Response: serviceResponse });
  } catch (error) {
    next(error);
  }
});

module.exports = { registerUser, loginUser };
