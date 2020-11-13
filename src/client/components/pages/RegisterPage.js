import React, { useState } from "react";
import { connect } from "react-redux";
import { logIn } from "./../../redux/actions/account";
import FormInput from "./../base/FormInput";
import { Formik, Form } from "formik";
import { register } from "./../../services/userServices";
import { httpStatusCodes } from "./../../../common/constants";
// Material UI
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
// React Router
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  function formValidate(values) {
    console.log("form values: ", values);
    const errors = {};

    if (!values.firstName) {
      errors.firstName = "This field is required!";
    }

    if (!values.lastName) {
      errors.lastName = "This field is required!";
    }

    if (!values.email) {
      errors.email = "This field is required!";
    } else {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!pattern.test(values.email)) {
        errors.email = "Please provide a valid email!";
      }
    }

    if (!values.password) {
      errors.password = "This field is required!";
    }

    if (!values.reenterPw) {
      errors.reenterPw = "This field is required!";
    }

    if (
      values.password &&
      errors.reenterPw &&
      values.password !== values.reenterPw
    ) {
      errors.reenterPw = "Passwords do not match!";
    }
    // TODO: add password validation for strength

    return errors;
  }

  // TODO: add a button to show password
  const [showPw, setShowPw] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const history = useHistory();

  // TODO: replace home with <Brand>
  console.log("rerendering page");
  return (
    <>
      {registrationSuccess && (
        <Modal aria-labelledby="account-registration-successful">
          <h2>Registration Successful!</h2>
          <p>To continue, please log into your account.</p>
          <Button
            onClick={() => {
              console.log("history: ", history);
              history.push("/login");
            }}
          >
            Okay
          </Button>
        </Modal>
      )}
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          reenterPw: "",
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validate={formValidate}
        onSubmit={(values, { setFieldError }) => {
          console.log("calling validate");
          // const errors = validate(values);
          register(
            values,
            (result) => {
              // Show success message with ok button
              // pressing the ok button redirects to login page
              console.log("success!");
              setRegistrationSuccess(true);
            },
            (err) => {
              console.log("response error: ", err);
              switch (err) {
                case httpStatusCodes.BAD_REQUEST:
                  setFieldError("email", err.response.body.message);
                  break;
                default:
                  console.log("something went wrong");
              }
            }
          );
        }}
      >
        {() => (
          <Form>
            <FormInput name="firstName" label="First Name:" />
            <FormInput name="lastName" label="Last Name:" />
            <FormInput name="email" label="Email:" />
            <FormInput
              name="password"
              label="Password:"
              type={showPw ? "text" : "password"}
            />
            <FormInput
              name="reenterPw"
              label="Re-enter Password:"
              type={showPw ? "text" : "password"}
            />
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
