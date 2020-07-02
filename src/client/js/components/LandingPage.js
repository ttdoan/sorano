import React from "react";
// Needed to polyfill ECMAScript features
import "core-js/stable";
// Need to use transpiled generator functions
import "regenerator-runtime/runtime";

export default function LandingPage() {
  function signup() {
    (async () => {
      let data = await fetch("http://localhost:3000/signup");
      console.log(data.json());
    })();
  }

  function login() {}

  return (
    <>
      <nav>
        <button onClick={signup}>Sign Up</button>
        <button onClick={login}>Log in</button>
      </nav>
    </>
  );
}
