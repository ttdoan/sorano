import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  function login() {}

  // If not logged in, then show the signup button.
  // Otherwise, show the user button.

  // In order:
  // Brand
  // Search bar
  // Account
  // Cart
  return (
    <>
      <nav>
        <Link to="/register">Signup</Link>
        <button onClick={login}>Log in</button>
      </nav>
    </>
  );
}
