const mongoose = require("mongoose");
const { Schema } = mongoose;

const videoSchema = new Schema(
  {
    videoFile: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    duration: {
      type: Number,
    },
    views: {
      type: Number,
    },
    isPublished: {
      type: Boolean,
    },
  },
  { tiimestamps: true },
);

module.exports = Video = mongoose.model("Video", videoSchema);
