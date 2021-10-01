const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.js");

const {
  refreshTokens,
  COOKIE_OPTIONS,
  generateToken,
  generateRefreshToken,
  getCleanUser,
  verifyToken,
  clearTokens,
  handleResponse,
} = require("../utils/utils");

// validate user credentials
router.post("/auth/signin", async function (req, res, next) {
  const user = req.body.username;
  const pwd = req.body.password;

  // return 400 status if username/password is not exist
  if (!user || !pwd) {
    return handleResponse(
      req,
      res,
      400,
      null,
      "Username and Password required."
    );
  }

  const userData = await User.findOne()
    .where("username")
    .equals(user)
    .where("password")
    .equals(pwd);

  // return 401 status if the credential is not matched
  if (!userData) {
    return handleResponse(
      req,
      res,
      401,
      null,
      "Username or Password is Wrong."
    );
  }

  // get basic user details
  const userObj = getCleanUser(userData);

  // generate access token
  const tokenObj = generateToken(userData);

  // generate refresh token
  const refreshToken = generateRefreshToken(userObj.userId);

  // refresh token list to manage the xsrf token
  refreshTokens[refreshToken] = tokenObj.xsrfToken;
  console.log("----- Set refresh token ------");
  console.log("RefreshTokens: ", refreshTokens);

  // set cookies
  res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
  res.cookie("XSRF-TOKEN", tokenObj.xsrfToken);

  return handleResponse(req, res, 200, {
    user: userObj,
    token: tokenObj.token,
    expiredAt: tokenObj.expiredAt,
  });
});

router.post("/auth/logout", (req, res) => {
  clearTokens(req, res);
  return handleResponse(req, res, 204);
});

// verify the token and return new tokens if it's valid
router.post("/auth/verifyToken", function (req, res) {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;
  if (!refreshToken) {
    return handleResponse(req, res, 204);
  }

  // verify xsrf token
  const xsrfToken = req.headers["x-xsrf-token"];
  if (
    !xsrfToken ||
    !(refreshToken in refreshTokens) ||
    refreshTokens[refreshToken] !== xsrfToken
  ) {
    return handleResponse(req, res, 401);
  }

  // verify refresh token
  verifyToken(refreshToken, "", async (err, payload) => {
    if (err) {
      return handleResponse(req, res, 401);
    } else {
      const userData = await User.findOne().where("_id").equals(payload.userId);

      if (!userData) {
        return handleResponse(req, res, 401);
      }

      // get basic user details
      const userObj = getCleanUser(userData);

      // generate access token
      const tokenObj = generateToken(userData);

      // refresh token list to manage the xsrf token
      refreshTokens[refreshToken] = tokenObj.xsrfToken;
      console.log("Verify API - RefreshTokens: ", refreshTokens);
      res.cookie("XSRF-TOKEN", tokenObj.xsrfToken);

      // return the token along with user details
      return handleResponse(req, res, 200, {
        user: userObj,
        token: tokenObj.token,
        expiredAt: tokenObj.expiredAt,
      });
    }
  });
});

// /* GET ALL USERS */
router.get("/getAllUsers", function (req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

// /* GET SINGLE USER BY ID */
// router.get("/:id", function (req, res, next) {
//   User.findById(req.params.id, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

// /* SAVE USER */
router.post("/addUser", function (req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
