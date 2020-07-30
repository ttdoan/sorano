import React from "react";
// Needed to polyfill ECMAScript features
import "core-js/stable";
// Need to use transpiled generator functions
import "regenerator-runtime/runtime";
import { Switch, Route } from "react-router-dom";

import Nav from "./Nav";
import RegisterPage from "./RegisterPage";

export default function Website() {
  return (
    <>
      <Nav />
      <Switch>
        <Route path="/" exact />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" />
        <Route path="/account" />
      </Switch>
    </>
  );
}
