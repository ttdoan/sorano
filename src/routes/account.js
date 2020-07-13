import express from "express";
import User from "./../models/user";
import React from "react";
import SignupPage from "./../client/js/components/SignupPage";
import { renderToString } from "react-dom/server";

let router = express.Router();

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
  let user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  (async () => {
    // Check if user already exists in database
    await User.find({ email: user.email }, async (err, result) => {
      if (result.length === 0) {
        await user.createHash(user.password);
        await user.save(function (err) {
          if (err) throw err;
          return res.status(201).json({
            message: `Email ${user.email} is registered successfully!`,
          });
        });
      } else
        return res
          .status(400)
          .json({ message: `Email ${user.email} already exists!` });
    });
  })();
});

// TODO: add a delete route
router.post("/signin", (req, res) => {
  // authenticate
  // create a token
});

export default router;
