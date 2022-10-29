import { useState } from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { AuthContextProvider } from "./authContext/components/AuthContext";
import { ProtectedRoutes } from "./authContext/components/ProtectedRoutes";
import Dashboard from "./dashboard/components/Dashboard";
import SignInSide from "./login/components/SignInSide";
import ErrorPage from "./routerComponents/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignInSide />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes>
        <Dashboard />
      </ProtectedRoutes>
    ),
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
