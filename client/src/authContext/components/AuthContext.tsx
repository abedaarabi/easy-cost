import React, { createContext, useContext } from "react";
// import { getUserDetails } from "../config/firebase";

import { CircularProgress } from "@mui/material";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import { async } from "@firebase/util";
import { Box } from "@mui/system";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import { operationsByTag } from "../../api/easyCostComponents";
import { UserEntity } from "../../api/easyCostSchemas";

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState(null) as any;
  const [loading, setLoading] = React.useState(true);
  const [loginMsg, setLoginMsg] = React.useState<any>();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user);

        const useDetails = await operationsByTag.user.userControllerFindOne({
          pathParams: { id: user.uid },
        });

        setUser({
          uid: user.uid,

          // email: user.email,
          ...useDetails,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function login(email: string, password: string) {
    const loginResult = await signInWithEmailAndPassword(auth, email, password);
    console.log(loginResult);

    return loginResult;
  }

  async function logout() {
    await signOut(auth);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setLoading,
        setUser,
        logout,
        login,
        loginMsg,
        setLoginMsg,
      }}
    >
      {loading ? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-50px",
            marginLeft: "-50px",
            width: "100px",
            height: "100px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
