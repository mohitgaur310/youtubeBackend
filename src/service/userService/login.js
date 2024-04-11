const { compareBcryptPassword } = require("../../utils/handler.js");
const { error, success } = require("../../utils/response.js");
const User = (require = require("../../models/User.model"));

const loginService = async ({ email, password }) => {
  const existingUsesr = await User.findOne({
    $or: [{ email: email }, { username: email }],
  });
  if (!existingUsesr) return error(404, "email doesn't exists!!! ");
  console.log("existing user ===>>", existingUsesr);

  const pass = await compareBcryptPassword(password, existingUsesr.password);
  console.log("pass=,,,>", pass);
  if (!pass) return error(404, "Password doesn't match");

  return success({
    username: existingUsesr.username,
    fullname: existingUsesr.fullname,
    accessToken: existingUsesr.accessToken,
    avatar: existingUsesr.avatar,
    coverImage: existingUsesr.coverImage,
  });
};

module.exports = { loginService };
