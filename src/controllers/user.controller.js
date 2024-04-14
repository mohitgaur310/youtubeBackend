const {
  userSchema,
  loginEmail,
  loginUsername,
} = require("../utils/validate.js");
const { asyncHandler } = require("../utils/asyncHandler");
const { error, success } = require("../utils/response.js");
const uploadOnCloudinary = require("../utils/cloudinary.js");
const { register } = require("../service/userService/register");
const { loginService } = require("../service/userService/login.js");
const UserModel = require("../models/User.model.js");
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

    let options = {
      maxAge: 20 * 60 * 10000,
      httpOnly: true,
    };
    const serviceResponse = await loginService(value, loginType);
    res.cookie("accessToken", serviceResponse.data.accessToken, options);
    return res.status(200).json({ Response: serviceResponse });
  } catch (error) {
    next(error);
  }
});

const logout = asyncHandler(async (req, res) => {
  console.log("user===>>>", req.user);
  await UserModel.findByIdAndUpdate(
    { _id: req.user._id },
    {
      $set: { accessToken: undefined },
    },
    { new: true },
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res.send(200).clearCookie("accessToken", options).json(success({}));
});
module.exports = { registerUser, loginUser, logout };
