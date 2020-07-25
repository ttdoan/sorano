import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Website from "./Website";

const store = createStore(() => {});

export default function Client() {
  useEffect(() => {
    // TODO: refresh token
    // TODO: set browser fingerprint in redux
  }, []);

  return (
    <Provider store={store}>
      <Website />
    </Provider>
  );
}
