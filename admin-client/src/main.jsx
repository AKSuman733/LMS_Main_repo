import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store/store";

/* Global Styles */

import "./styles/globals.css";
import "./styles/theme.css";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

toast.success(
  "Course created successfully!"
);

toast.error(
  "Please upload a valid file."
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <Provider store={store}>

      <BrowserRouter>

        <App />

      </BrowserRouter>

    </Provider>

  </React.StrictMode>
);