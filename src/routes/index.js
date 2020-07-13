import Client from "../client/js/components/Client";
import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";

let router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  let reactComp = renderToString(<Client />);
  res.setHeader("Content-Type", "text/html");
  res.render("index", { reactComp: reactComp });
});

module.exports = router;
