import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Website from "./Website";

const store = createStore();

export default function Client() {
  return (
    <Provider store={store}>
      <Website />
    </Provider>
  );
}
