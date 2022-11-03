import React, { createContext, useContext } from "react";
// import { getUserDetails } from "../config/firebase";

import { CircularProgress } from "@mui/material";

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState(null) as any;
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (user) {
      setUser({});
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setLoading,
        setUser,
      }}
    >
      {children}
      {/* {loading ? <CircularProgress /> : children} */}
    </AuthContext.Provider>
  );
};
