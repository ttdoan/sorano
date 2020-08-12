import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute(props) {
  return (
    <>
      {props.loggedin ? (
        <Route path={props.path} component={props.component} />
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  loggedin: state.account.loggedin,
});

export default connect(mapStateToProps)(PrivateRoute);
