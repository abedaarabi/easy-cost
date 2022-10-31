import { useState } from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { AuthContextProvider } from "./authContext/components/AuthContext";
import { ProtectedRoutes } from "./authContext/components/ProtectedRoutes";
import Dashboard from "./dashboard/page/Dashboard";
import SignInSide from "./login/components/SignInSide";
import ErrorPage from "./routerComponents/ErrorPage";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Tune } from "@mui/icons-material";

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
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
