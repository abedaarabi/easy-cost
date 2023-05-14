import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProtectedRoutes } from "./authContext/components/ProtectedRoutes";
import MiniDrawer from "./dashboard/page/Db";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "";
import { createTheme } from "@mui/material/styles";
import {
  AuthContextProvider,
  useAuth,
} from "./authContext/components/AuthContext";
import { Stack } from "@mui/system";
import { Alert, ThemeProvider, AlertTitle } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#343a40",
    },
    secondary: {
      main: "#e76f51",
    },
    other: {
      main: "#ba324f",
    },
  },
} as any);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
