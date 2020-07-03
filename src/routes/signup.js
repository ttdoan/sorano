import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";

let router = express.Router();

router.get("/", (req, res) => {
  //   let reactComp = renderToString();
  //   res.setHeader("Content-Type", "text/html");
  //   res.render("signup", {reactComp: reactComp});
  res.send("yay");
});

export default router;
