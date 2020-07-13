import React from "react";
// Needed to polyfill ECMAScript features
import "core-js/stable";
// Need to use transpiled generator functions
import "regenerator-runtime/runtime";

export default function Website() {
  function signup() {
    (async () => {
      if (process.env.DEV_MODE)
        console.log("DEV_MODE: " + process.env.DEV_MODE);
      else console.log("THERE IS NO DEV_MODE");
      let url = process.env.DEV_MODE
        ? "http://localhost:" + process.env.PORT
        : "https://ecommerce-ttdoan.herokuapp.com";

      let data = await fetch(url + "/signup");
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
