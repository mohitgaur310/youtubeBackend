require("dotenv").config();
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./env" });
const app = express();
const connectDb = require("../src/db/index");

connectDb()
  .then(() => {
    app.on("error", (error) => {
      console.log(error);
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running on port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error in connection with database !!!", err);
  });
