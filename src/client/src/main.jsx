import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import AuthContextProvider from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <App />
        <Toaster/>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
);
