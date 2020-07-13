import React from "react";
import { hydrate } from "react-dom";
import Client from "./components/Client";

hydrate(<Client />, document.getElementById("root"));
