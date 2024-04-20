import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import ToastProvider from "./context/toast-context.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ToastProvider>
      <Router>
        <App />
        <Toaster />
      </Router>
    </ToastProvider>
  </Provider>
  // </React.StrictMode>
);
