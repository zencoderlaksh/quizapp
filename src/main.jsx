// index.js
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      {" "}
      {/* Only here, wrap App with Router */}
      <App />
    </Router>
  </StrictMode>
);
