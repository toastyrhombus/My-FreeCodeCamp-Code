import "bootstrap-css-only";
import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux";
import "./index.css";

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
