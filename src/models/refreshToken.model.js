const mongoose = require("mongoose");
const { Schema } = mongoose;

const refreshTokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = RefreshToken = mongoose.model(
  "RefreshToken",
  refreshTokenSchema,
);
