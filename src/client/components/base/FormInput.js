import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

export default function FormInput(props) {
  const self = useRef();

  useEffect(() => {
    props.register(self.current, props.options);
  }, [self]);

  let errorMsgs = [];
  if (props.status && !props.status.pass)
    errorMsgs = props.status.errors.map((err) => {
      return (
        <React.Fragment key={props.name + err}>
          <br />
          <span>{err}</span>
        </React.Fragment>
      );
    });

  return (
    <>
      <label htmlFor={props.name}>{props.label}</label>
      <br />
      <input
        type={props.type}
        id={props.name}
        name={props.name}
        ref={self}
      ></input>
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
