import express from "express";
import db from "oracledb";
import React from "react";
import { renderToString } from "react-dom/server";

let router = express.Router();

router.get("/", (req, res) => {
  let conn;
  (async () => {
    try {
      conn = await db.getConnection({
        user: "ephemeraldreams89@gmail.com",
        password: "D/J0whYdM2D;*!4jqdn2MVRqsx#+HTUP",
        connectString: "localhost:3000/orcl",
      });

      console.log("connection successful!");
    } catch (err) {
      console.error(
        "An error occurred when connecting to Oracle database - ",
        err
      );
    }
  })();

  //   let reactComp = renderToString();
  //   res.setHeader("Content-Type", "text/html");
  //   res.render("signup", {reactComp: reactComp});
  res.send("yay");
});

export default router;
