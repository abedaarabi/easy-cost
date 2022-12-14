import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProtectedRoutes } from "./authContext/components/ProtectedRoutes";
import MiniDrawer from "./dashboard/page/Db";

import { AuthContextProvider, useAuth } from "./authContext/components/AuthContext";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
