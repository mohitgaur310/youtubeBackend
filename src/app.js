const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    origin: process.env.CROS_ORIGIN,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

const userRouter = require("./routes/user.routes.js");
const tokenRouter = require("./routes/token.routes.js");
app.use("/api/v1/user", userRouter);
app.use("/api/v1/token", tokenRouter);
module.exports = { app };
