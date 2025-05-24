import React from "react";
import ReactDOM from "react-dom/client";  // react-dom/client import karo
import App from "./App";
import { AuthProvider } from "./context/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));  // root create karo

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
