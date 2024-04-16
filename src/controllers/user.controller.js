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
const User = require("../models/User.model.js");
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

    res.cookie("accessToken", serviceReg.result.accessToken);
    res.cookie("refreshToken", serviceReg.result.refreshToken);
    const resp = { ...serviceReg };
    // find a different way for this task
    delete resp.result.refreshToken;
    return res.status(200).json({ Response: resp });
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
    console.log("serviceResponse", serviceResponse);
    res.cookie("accessToken", serviceResponse.result.accessToken, options);
    res.cookie("refreshToken", serviceResponse.result.refreshToken);
    const resp = { ...serviceResponse };
    // find a different way for this task
    delete resp.result.refreshToken;
    return res.status(200).json({ Response: resp });
  } catch (error) {
    next(error);
  }
});

const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    { _id: req.user._id },
    {
      $unset: {
        accessToken: 1, // this removes the field from document
      },
    },
    { new: true },
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(success({}));
});
module.exports = { registerUser, loginUser, logout };
