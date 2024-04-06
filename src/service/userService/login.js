const { error, success } = require("../../utils/response.js");
const User = (require = require("../../models/User.model"));

const loginService = async ({ email, password }) => {
  try {
    const existingUsesr = await User.findOne({ email: email });
    if (!existingUsesr) return error(404, "user not exists ");

    console.log("existing user==>", existingUsesr);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { loginService };
