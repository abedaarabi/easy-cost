import { useState } from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AuthContextProvider } from "./authContext/components/AuthContext";
import { ProtectedRoutes } from "./authContext/components/ProtectedRoutes";
// import Dashboard from "./dashboard/page/Dashboard";
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
import MiniDrawer from "./dashboard/page/Db";
import MaterialTable from "./dashboard/components/MaterialTable";
import Main from "./dashboard/page/Main";

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
        <MiniDrawer />
      </ProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "/dashboard/main",
        element: <Main />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/dashboard/material",
        element: <MaterialTable />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/dashboard/test",
        element: <p>Hello Test</p>,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthContextProvider>
        <RouterProvider router={router} fallbackElement={<MiniDrawer />} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
