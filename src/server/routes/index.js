// TODO: After compiling client side, Client.js is no
// longer referenced in this relative path. I updated
// package.json to copy the components/ directory into
// the dist folder as a temporary hack. Need to find a
// permanent solution...
import Client from "./../../client/components/Client";
import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import { StaticRouter } from "react-router-dom";

let router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  let reactComp = renderToString(
    <StaticRouter>
      <Client />
    </StaticRouter>
  );
  res.setHeader("Content-Type", "text/html");
  res.render("index", { reactComp: reactComp });
});

// exports.default = router;
export default router;
