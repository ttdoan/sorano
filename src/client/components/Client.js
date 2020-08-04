import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Website from "./Website";
import rootReducer from "./../redux/reducers";

const store = createStore(rootReducer);

export default function Client() {
  return (
    <Provider store={store}>
      <Website />
    </Provider>
  );
}
