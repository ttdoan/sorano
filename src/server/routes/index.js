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
import fs from "fs";

let router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  // Read the compiled frontend HTML file and inject rendered React
  // components for initial page loading.
  fs.readFile("./dist/client/index.html", "utf8", (err, html) => {
    if (err) throw err;

    let reactComp = renderToString(
      <StaticRouter>
        <Client />
      </StaticRouter>
    );
    html = html.replace("{reactComp}", reactComp);
    res.setHeader("Content-Type", "text/html");
    res.send(html);
  });
});

// exports.default = router;
export default router;
