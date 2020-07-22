import React from "react";
import { connect } from "react-redux";
import axios from "axios";

function Nav() {
  function signup() {
    if (process.env.DEV_MODE) console.log("DEV_MODE: " + process.env.DEV_MODE);
    else console.log("THERE IS NO DEV_MODE");
    let url = process.env.DEV_MODE
      ? "http://localhost:" + process.env.PORT
      : "https://ecommerce-ttdoan.herokuapp.com";

    // TODO: add password validation for strength
    // Check to see if passwords match

    axios
      .post(url + "/account/register", {
        user: {
          email: "heythere@gmail.com",
          password: "somepassword",
        },
      })
      .then((result) => {
        // Show success message
        // settimeout to redirect to homepage
      })
      .catch((err) => {});
  }

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
        <button onClick={signup}>Sign Up</button>
        <button onClick={login}>Log in</button>
      </nav>
    </>
  );
}

const mapStateToProps = (state) => {
  loggedIn: state.account.loggedIn;
};

export default connect()(Nav);
