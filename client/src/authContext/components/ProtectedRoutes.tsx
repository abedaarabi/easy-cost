import { useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "./AuthContext";

export function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  React.useEffect(() => {
    !user && navigate("/");
  }, [user]);

  return <div>{children}</div>;
}
