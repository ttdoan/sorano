import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "./base/FormInput";
import { useForm } from "./../hooks";
import axios from "axios";

export default function LoginPage() {
  function onSubmit() {
    handleSubmit(login);
  }

  function login(formData) {
    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:" + process.env.PORT
        : "https://ecommerce-ttdoan.herokuapp.com";

    axios
      .post(url + "/account/register", {
        user: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        },
      })
      .then((result) => {
        // Redirect to the destination path
        // If there is no destination path, then direct to homepage
        console.log("success!");
      })
      .catch((err) => {
        // call setStatus to set error
        console.log("failure");
      });
  }

  const [status, setStatus] = useState({});
  const { handleSubmit, register } = useForm(setStatus);

  // TODO: replace Home with Brand
  return (
    <>
      <Link to="/">Home</Link>
      <form onSubmit={onSubmit}>
        <FormInput
          type="text"
          name="email"
          label="Email:"
          register={register}
          options={{ required: true }}
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
        <input type="submit" />
      </form>
    </>
  );
}
