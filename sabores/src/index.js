import React from "react";
import ReactDOM from "react-dom";
import "./styles/theme.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap
import "@fortawesome/fontawesome-free/css/all.min.css"; // FontAwesome
import "leaflet/dist/leaflet.css"; // Leaflet
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
