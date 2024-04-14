const { error, success } = require("../../utils/response.js");
const User = require("../../models/User.model.js");
const { generateJwtToken, bcryptPassword } = require("../../utils/handler.js");

const register = async (value, avatar, coverImage) => {
  const { username, email, fullname, password } = value;

  const existingUsesr = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUsesr?.username) {
    return error(400, "user already exists!!");
  }

  const payload = {};
  payload.username = username;
  payload.email = email;
  payload.fullname = fullname;
  payload.password = await bcryptPassword(password);
  payload.avatar = avatar;
  payload.coverImage = coverImage;

  const response = await User.create(payload);

  const accesToken = generateJwtToken({ _id: response._id });
  //   payload.accessToken = accesToken
  const updateUser = await User.findByIdAndUpdate(
    { _id: response._id },
    {
      $set: { accessToken: accesToken },
    },
    {
      new: true,
    },
  );
  const resPayload = {};
  resPayload.username = response.username;
  resPayload.avatar = response.avatar;
  resPayload.coverImage = response.coverImage;
  resPayload.accessToken = updateUser.accessToken;
  return success(resPayload);
};

module.exports = { register };
