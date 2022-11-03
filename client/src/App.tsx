import { useState } from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  AuthContextProvider,
  useAuth,
} from "./authContext/components/AuthContext";
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
import UserTable from "./dashboard/components/UserTable";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import ProjectTable from "./dashboard/components/Projecttable";
import { Alert, Snackbar } from "@mui/material";

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
        path: "/dashboard",
        element: <Main />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/dashboard/material",
        element: <MaterialTable />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/dashboard/user",
        element: <UserTable />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/dashboard/project",
        element: <ProjectTable />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  const queryClient = new QueryClient();
  const { user, setUser, setLoading, loading } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthContextProvider>
        <Box sx={{ width: "100%", zIndex: 999999, position: "absolute" }}>
          {true && <LinearProgress color="info" />}
        </Box>
        <Snackbar open={true} autoHideDuration={6000} onClose={() => {}}>
          <Alert onClose={() => {}} severity="error" sx={{ width: "100%" }}>
            This is a success message!
          </Alert>
        </Snackbar>
        <RouterProvider router={router} fallbackElement={<MiniDrawer />} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
