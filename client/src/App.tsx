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

import { Alert, AlertTitle, Snackbar, Stack } from "@mui/material";
import ProjectTable from "./dashboard/components/ProjectTable";
import ProjectMaterialTable from "./project-material/page/ProjectMaterialTable";
import Page404 from "./Page404";
import SignUp from "./singup/SingUp";
import { useNetworkStatus } from "./hooks/useNetworkStatus";
import Invalidinvite from "./singup/Invalidinvite";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <SignInSide />,
  },
  {
    path: `/token/:tokenId/sing-up`,
    element: <SignUp />,
    errorElement: <Invalidinvite />,
  },
  {
    path: "/",
    errorElement: <ErrorPage />,

    element: (
      <ProtectedRoutes>
        <MiniDrawer />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/material",
        element: <MaterialTable />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/user",
        element: <UserTable />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/project",
        element: <ProjectTable />,
        errorElement: <ErrorPage />,
        // children: [
        //   {
        //     path: "/dashboard/project/:projectId",
        //     element: <ProjectMaterialTable />,
        //     errorElement: <ErrorPage />,
        //   },
        // ],
      },
      {
        path: "/project/:projectId",
        element: <ProjectMaterialTable />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  console.log("abed");

  const queryClient = new QueryClient();
  const { user, setUser, setLoading, loading } = useAuth();
  const isOnline = useNetworkStatus();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <Box sx={{ width: "100%", zIndex: 999999, position: "absolute" }}>
        {loading && <LinearProgress color="info" />}
      </Box>
      <Snackbar open={true} autoHideDuration={6000} onClose={() => {}}>
        <Alert onClose={() => {}} severity="error" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
      <RouterProvider router={router} fallbackElement={<MiniDrawer />} />
      {!isOnline && (
        <Stack
          sx={{
            width: "20%",
            // m: "auto",
            zIndex: "9999",
            position: "absolute",
            top: "10%",
            left: "40%",
            marginTop: "-50px",
            marginLeft: "-50px",

            // height: "100px",
          }}
          spacing={2}
        >
          <Alert severity="error">
            <AlertTitle>
              <strong>Error</strong>
            </AlertTitle>
            No Internet Access
          </Alert>
        </Stack>
      )}
    </QueryClientProvider>
  );
}

export default App;
