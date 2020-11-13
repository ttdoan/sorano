import express from "express";
import React from "react";
import jwt from "./../jwtUtils";
import { renderToString } from "react-dom/server";
import commonConfig from "./../../common/_config";
import { httpStatusCodes } from "./../../common/constants";

import User from "./../models/user";
import sellerRouter from "./seller";
// import SignupPage from "./../client/js/components/SignupPage";

let router = express.Router();
const REFRESH_COOKIE_NAME = "REFRESHCOOKIE";

// router.get("/", (req, res) => {
//   console.log("Got into signup");
//   let reactComp = renderToString(<SignupPage />);
//   res.setHeader("Content-Type", "text/html");
//   return res.render("signup", { reactComp: reactComp });
// });

// Register a new user
// NOTE: It's better to use POST command with sensitive info
//       (such as login info) because GET request has sensitive info
//       appended to the URL whereas POST request has sensitive info
//       in the message body, which is more secure.
router.post("/register", (req, res) => {
  let errors = [];
  if (!req.body.user.firstName)
    errors.push("Request body.user.firstName is required!");
  if (!req.body.user.lastName)
    errors.push("Request body.user.lastName is required!");
  if (!req.body.user.email) errors.push("Request body.user.email is required!");
  if (!req.body.user.password)
    errors.push("Request body.password is required!");
  if (errors.length) return res.status(400).json({ errors });

  let user = new User({
    firstName: req.body.user.firstName,
    lastName: req.body.user.lastName,
    email: req.body.user.email,
    password: req.body.user.password,
  });

  (async () => {
    // Check if user already exists in database
    User.find({ email: user.email }, async (err, result) => {
      if (result.length === 0) {
        user.createHash(user.password);
        await user.save(function (err) {
          if (err) throw err;
          return res.status(httpStatusCodes.CREATED).json({
            message: `Email ${user.email} is registered successfully!`,
          });
        });
      } else
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ message: `Email ${user.email} already exists!` });
    });
  })();
});

// Login into account with user credentials
router.post("/login", (req, res) => {
  let errors = [];
  if (!req.body.user.email) errors.push("Request email is required!");
  if (!req.body.user.password) errors.push("Request password is required!");
  // Fingerprint is used to identify a unique browser.
  // TODO: need to incorporate later
  // if (!req.body.browser.fingerprint)

  //   errors.push("Request body.browser.fingerprint is required!");
  if (errors.length)
    return res.status(httpStatusCodes.BAD_REQUEST).json({ errors });

  // Authenticate user
  User.findOne(
    { email: req.body.user.email },
    "salt password",
    (errors, result) => {
      if (errors)
        return res.status(httpStatusCodes.BAD_REQUEST).json({ errors });
      // User is not registered in database.
      if (!result)
        return res.status(httpStatusCodes.BAD_REQUEST).json({
          errors: `User ${req.body.user.email} is not registered yet!`,
        });

      // Password is not correct.
      if (
        !User.validatePassword(
          result.password,
          result.salt,
          req.body.user.password
        )
      )
        return res
          .status(httpStatusCodes.UNAUTHORIZED)
          .json({ error: "Incorrect password!" });

      // Generate access token.
      let accessToken = jwt.createAccessToken({
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        email: req.body.user.email,
      });
      // Generate refresh token and store token value in database.
      let refreshToken = jwt.createRefreshToken({
        email: req.body.user.email,
        fingerprint: req.body.browser.fingerprint,
      });

      // Set refresh token in HttpOnly cookie.
      return res
        .cookie(REFRESH_COOKIE_NAME, refreshToken, {
          maxAge: 1000 * commonConfig.REFRESH_AUTH_EXP,
          httpOnly: true,
          sameSite: true,
        })
        .status(200)
        .json({
          accessToken,
        });
    }
  );
});

// Modify user password
router.post("/modify", jwt.authenticateToken, (req, res) => {
  // TODO: add authentication
});

// Delete user account
router.post("/delete", jwt.authenticateToken, (req, res) => {
  if (!req.body.user || !req.body.user.email)
    return res
      .status(400)
      .json({ message: "Request doesn't have user email in body!" });

  User.deleteOne({ email: req.body.user.email }, (err, result) => {
    if (err) res.status(400).json({ message: err });
    if (result.deletedCount === 1)
      return res
        .status(200)
        .json({ message: `Successfully deleted user ${req.body.user.email}!` });
    else
      return res.status(400).json({
        message: `User ${req.body.user.email} was not found in database!`,
      });
  });
});

router.post("/refresh", (req, res) => {
  // Check if refresh token is in cookie
  console.log("Cookies: " + req.cookies);
  if (!req.cookies || !req.cookies.name === "refreshToken")
    return res.status(401).json({ message: "No refresh token" });

  // Verify the refresh token
  let tokens = jwt.verifyRefreshToken();
  if (tokens) {
    if (tokens.refresh)
      return res
        .cookie(REFRESH_COOKIE_NAME, tokens.refresh, {
          maxAge: 1000 * commonConfig.REFRESH_AUTH_EXP,
          httpOnly: true,
          sameSite: true,
        })
        .status(201)
        .json({ accessToken: tokens.acess });
  } else {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
});

// Subroute for seller account
router.use("/seller", sellerRouter);

export default router;
