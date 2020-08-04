import React from "react";
import { Link } from "react-router-dom";
import Brand from "./Brand";

export default function Nav() {
  function login() {}

  // If not logged in, then show the signup button.
  // Otherwise, show the user button.

  // In order:
  // Brand
  // Search bar
  // Account
  // Night mode
  // Cart
  return (
    <>
      <nav>
        <Brand />
        <Link to="/register">Signup</Link>
        <Link to="/login">Login</Link>
      </nav>
    </>
  );
}
