const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const respone = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File uploaded succefully:", respone.url);
    return respone;
  } catch (error) {
    fs.unlinkSync(localFilePath); // this unlink the local file
    return null;
  }
};

module.exports = uploadOnCloudinary;
