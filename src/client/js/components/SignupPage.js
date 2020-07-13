import React from "react";

export default function SignupPage() {
  function onClick() {}

  return (
    <>
      <a href={""}>Home</a>
      <form>
        <label for="username">Username</label>
        <input type="text"></input>
        <label for="email">Email</label>
        <input type="text"></input>
        <label for="password">Password</label>
        <input type="text"></input>
        <label for="reenter-pw">Re-enter Password</label>
        <input type="text"></input>
        <button onClick={onClick}>Create Account</button>
      </form>
    </>
  );
}
