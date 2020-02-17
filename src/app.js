require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const passport = require("passport");

const { router: authRouter, localStrategy, jwtStrategy } = require("./auth");
const userRouter = require("./routes/users");
const commentRouter = require("./routes/comments");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express.json());

passport.use(localStrategy);
passport.use(jwtStrategy);

const jwtAuth = passport.authenticate("jwt", { session: false });

app.get("/", (req, res) => {
  res.send("Hello, boilerplate!");
});

// User can log in
app.use("/api/users/login", authRouter);

// Create user route
app.use("/api/users", userRouter);

// Create comment route
app.use("/api/comments", commentRouter);

app.get("/api/protected", jwtAuth, (req, res) => {
  return res.json({ data: "rosebud" });
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
