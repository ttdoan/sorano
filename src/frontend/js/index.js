import React from "react";
import { hydrate } from "react-dom";
import LandingPage from "./components/LandingPage";

hydrate(<LandingPage />, document.getElementById("root"));
