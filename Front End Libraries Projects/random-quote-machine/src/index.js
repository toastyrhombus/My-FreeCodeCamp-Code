import React from "react"
import ReactDOM from "react-dom"
import App from "./App";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.css'

document.addEventListener("DOMContentLoaded", function(event) { 
  ReactDOM.render(
      <App />,
    document.getElementById("root")
  )  
});
