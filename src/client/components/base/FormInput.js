import React from "react";
import PropTypes from "prop-types";

import { useField } from "formik";
// Material UI
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

export default function FormInput(props) {
  const [field, meta] = useField(props);

  return (
    <>
      <TextField
        variant="outlined"
        label={props.label}
        type={props.type}
        {...field}
      />
      {meta.touched && meta.error && (
        <Alert severity="error">
          <AlertTitle>ERROR</AlertTitle>
          {meta.error}
        </Alert>
      )}
    </>
  );
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};

FormInput.defaultProps = {
  type: "text",
};
