import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Test from "./pages/Test.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SnackbarProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </SnackbarProvider>
  </BrowserRouter>
);
