import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

// Material UI
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

export default function FormInput(props) {
  const self = useRef();

  useEffect(() => {
    console.log("Calling register: ", self.current);
    props.register(self.current, props.options);
  }, [self]);

  let errorMsgs = null;
  if (props.status && !props.status.pass)
    errorMsgs = (
      <Alert severity="error">
        <AlertTitle>ERROR</AlertTitle>
        {props.status.errors.map((err) => {
          return <span key={err}>{err}</span>;
        })}
      </Alert>
    );

  return (
    <>
      <TextField
        variant="outlined"
        label={props.label}
        name={props.name}
        id={props.name}
        required
        inputRef={self}
      />
      {errorMsgs}
    </>
  );
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  options: PropTypes.object,
  status: PropTypes.shape().isRequired,
};

FormInput.defaultProps = {
  options: {},
};
