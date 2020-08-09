import React from "react";
import { hydrate } from "react-dom";
import Client from "./components/Client";
import { BrowserRouter } from "react-router-dom";

if (typeof document !== "undefined")
  hydrate(
    <BrowserRouter>
      <Client />
    </BrowserRouter>,
    document.getElementById("root")
  );
