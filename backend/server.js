require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = express.Router();

const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const taskRoutes = require("./routes/tasks");
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.error(`There was an error in connection: ${err}`));

const { refreshTokens, verifyToken, handleResponse } = require("./utils/utils");

const app = express();
const port = process.env.PORT || 4000;

// // list of the users to be consider as a database for example
// const userList = [
//   {
//     password: "clue",
//     name: "Clue",
//     username: "clue",
//     isAdmin: true,
//   },
//   {
//     password: "mediator",
//     name: "Mediator",
//     username: "mediator",
//     isAdmin: true,
//   },
//   {
//     password: "123456",
//     name: "Clue Mediator",
//     username: "cluemediator",
//     isAdmin: true,
//   },
// ];

// enable CORS
app.use(
  cors({
    origin: process.env.ORIGIN, // url of the frontend application
    credentials: true, // set credentials true for secure httpOnly cookie
  })
);

// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// use cookie parser for secure httpOnly cookie
app.use(cookieParser(process.env.COOKIE_SECRET));

// user api routes
app.use("/users", userRoutes);

// middleware that checks if JWT token exists and verifies it if it does exist.
// In all private routes, this helps to know if the request is authenticated or not.
const authMiddleware = function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers["authorization"];

  if (!token) return handleResponse(req, res, 401);

  token = token.replace("Bearer ", "");

  // get xsrf token from the header
  const xsrfToken = req.headers["x-xsrf-token"];
  if (!xsrfToken) {
    return handleResponse(req, res, 403);
  }

  // verify xsrf token
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;
  if (
    !refreshToken ||
    !(refreshToken in refreshTokens) ||
    refreshTokens[refreshToken] !== xsrfToken
  ) {
    console.error("Error concerning refreshToken");
    return handleResponse(req, res, 403);
  }

  // verify token with secret key and xsrf token
  verifyToken(token, xsrfToken, (err, payload) => {
    if (err) {
      console.error("Error concering token verification");
      return handleResponse(req, res, 401);
    } else {
      req.user = payload; //set the user to req so other routes can use it
      next();
    }
  });
};

app.use("/tasks", authMiddleware, taskRoutes);

// get list of the users
// app.get("/users/getList", authMiddleware, (req, res) => {
//   const list = userList.map((x) => {
//     const user = { ...x };
//     delete user.password;
//     return user;
//   });
//   return handleResponse(req, res, 200, {
//     random: Math.random(),
//     userList: list,
//   });
// });

app.listen(port, () => {
  console.log("Server started on: " + port);
});

module.exports = app;
