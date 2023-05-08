import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProtectedRoutes } from "./authContext/components/ProtectedRoutes";
import MiniDrawer from "./dashboard/page/Db";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "";

import {
  AuthContextProvider,
  useAuth,
} from "./authContext/components/AuthContext";
import { Stack } from "@mui/system";
import { Alert, AlertTitle } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
