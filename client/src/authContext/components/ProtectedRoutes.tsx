import { useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "./AuthContext";

export function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log({ user });

  React.useEffect(() => {
    !user && navigate("/login");
  }, [user]);

  return <div>{user ? children : null}</div>;
}
