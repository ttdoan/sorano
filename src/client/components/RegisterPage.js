import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logIn } from "./../redux/actions/account";
import FormInput from "./base/FormInput";
import { useForm } from "./../hooks";
import { register as registerAccount } from "./../services/userServices";

function RegisterPage() {
  function signup(formData) {
    // Check if passwords match
    if (formData.password != formData.reenterPw) {
      setStatus({
        reenterPw: {
          pass: false,
          errors: ["Passwords don't match!"],
        },
      });
      return;
    }

    // TODO: add password validation for strength
    registerAccount(
      formData,
      (result) => {
        // Show success message with ok button
        // pressing the ok button redirects to login page
        console.log("success!");
      },
      (err) => {
        console.log("failure");
      }
    );
  }

  function onSubmit(e) {
    e.preventDefault();
    handleSubmit(signup);
  }

  const [status, setStatus] = useState({});
  // useForm is used to keep track of <input> values so that
  // the page doesn't re-render on each letter the user types
  // in. However, when submit button is clicked and there are
  // errors in the form input values, the page needs to re-render
  // in order to render the errors.
  const { handleSubmit, register } = useForm(setStatus);

  // TODO: replace home with <Brand>
  console.log("rerendering page");
  return (
    <>
      <Link to="/">Home</Link>
      <form onSubmit={onSubmit}>
        <FormInput
          type="text"
          name="firstName"
          label="First Name:"
          register={register}
          options={{ required: true }}
          status={status.firstName}
        />
        <br />
        <FormInput
          type="text"
          name="lastName"
          label="Last Name:"
          register={register}
          options={{ required: true }}
          status={status.lastName}
        />
        <br />
        <FormInput
          type="text"
          name="email"
          label="Email:"
          register={register}
          options={{
            required: true,
            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          }}
          status={status.email}
        />
        <br />
        <FormInput
          type="text"
          name="password"
          label="Password:"
          register={register}
          options={{ required: true }}
          status={status.password}
        />
        <br />
        <FormInput
          type="text"
          name="reenterPw"
          label="Re-enter Password:"
          register={register}
          status={status.reenterPw}
        />
        <br />
        <input type="submit" />
      </form>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  logIn: (token) => dispatch(logIn(token)),
});

export default connect(null, mapDispatchToProps)(RegisterPage);
