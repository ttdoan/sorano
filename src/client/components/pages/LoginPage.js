import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FormInput from "./../base/FormInput";
import { Formik, Form } from "formik";
import { login } from "./../../services/userServices";
import { httpStatusCodes } from "./../../../common/constants";
// Material UI
import Button from "@material-ui/core/Button";

export default function LoginPage() {
  const formValidate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "This field is required!";
    }

    if (!values.password) {
      errors.password = "This field is required!";
    }

    return errors;
  };

  const history = useHistory();
  // TODO: replace Home with Brand
  return (
    <>
      <Link to="/">Home</Link>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validate={formValidate}
        onSubmit={(values, { setFieldError }) => {
          login(
            values,
            (result) => {
              console.log("login response result: ", result);
              // TODO: set the accesstoken
              history.push("/");
            },
            (err) => {
              console.log(err.response);
              switch (err.response.status) {
                case httpStatusCodes.BAD_REQUEST:
                  setFieldError(
                    "email",
                    "Cannot find account. Please register first!"
                  );
                  break;
                case httpStatusCodes.UNAUTHORIZED:
                  setFieldError("email", "Invalid password!");
                  break;
                default:
                  console.log("something bad happened");
              }
            }
          );
        }}
      >
        {() => (
          <Form>
            <FormInput name="email" label="Email:" />
            <FormInput name="password" label="Password:" type="password" />
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
