const { error, success } = require("../../utils/response.js");
const User = require("../../models/User.model.js");

const register = async (value, avatar, coverImage) => {
  const { username, email, fullname, password } = value;

  const existingUsesr = await User.findOne({
    $or: [{ username }, { email }],
  });

  console.log("existing error==>>", existingUsesr);
  if (existingUsesr?.username) {
    return error(400, "user already exists!!");
  }
  const payload = {};
  payload.username = username;
  payload.email = email;
  payload.fullname = fullname;
  payload.password = password;
  payload.avatar = avatar;
  payload.coverImage = coverImage;
  console.log("payload==>>", payload);
  const response = await User.create(payload);
  console.log(response);
  return success(response);
  //   if(!response)
};

module.exports = { register };
