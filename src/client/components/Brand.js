import React from "react";
import logo from "./../../../public/logo.png";
import { Link } from "react-router-dom";

export default function Brand() {
  return (
    <div className="brand">
      <Link to="/">
        <img src={logo} alt="logo" />
        <span>orano</span>
      </Link>
    </div>
  );
}
