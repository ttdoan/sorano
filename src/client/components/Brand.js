import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Brand() {
  return (
    <div className="brand">
      <Link to="/">
        <Logo />
        <span>orano</span>
      </Link>
    </div>
  );
}
