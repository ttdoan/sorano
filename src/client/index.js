import React from "react";
import { hydrate } from "react-dom";
import Client from "./components/Client";
import ErrorBoundary from "./components/ErrorBoundary";
import { BrowserRouter } from "react-router-dom";

if (typeof document !== "undefined")
  hydrate(
    <ErrorBoundary>
      <BrowserRouter>
        <Client />
      </BrowserRouter>
    </ErrorBoundary>,
    document.getElementById("root")
  );
