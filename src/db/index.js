const mongoose = require("mongoose");
const { DB_NAME } = require("../constant");

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`,
    );
    console.log("connection instance==>", connectionInstance.connections);
  } catch (error) {
    console.log("Mongodb connection error", error);
    process.exit(1);
  }
};

module.exports = connectDb;
