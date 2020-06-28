import LandingPage from "../frontend/js/components/LandingPage";
import React from "react";
import { renderToNodeStream } from "react-dom/server";

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render("index", { title: "Express" });
  let reactComp = renderToNodeStream(<LandingPage />);
  // res.writeHead(200, { "Content-Type": "text/html" });
  res.setHeader("Content-Type", "text/html");
  res.render("index", { reactComp: reactComp });
  // res.send(reactComp);
});

module.exports = router;
