import React from "react";
import { Navigate } from "react-router";

// project import
import { useSelector } from "@/store";

// types
import { GuardProps } from "@/types/auth";

// ==============================|| AUTH GUARD ||============================== //

const AuthGuard: React.FC<GuardProps> = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return isLoggedIn ? children : <Navigate to={"/login"} />;
};

export default AuthGuard;
