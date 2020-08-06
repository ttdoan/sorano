// import Client from "client/components/Client";
import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import { StaticRouter } from "react-router-dom";

let router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  // TODO: after production build, Client.js is no longer available in client
  // due to bundling so I need a way to reference the original source file.
  // Temporary hack until I figure out a better solution...
  const Client =
    process.env.NODE_ENV === "production"
      ? require("../../../src/client/components/Client")
      : require("../../client/components/Client");

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
