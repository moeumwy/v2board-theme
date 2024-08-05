import React from "react";
import { Navigate } from "react-router";

// project import
import { useSelector } from "@/store";

// types
import { GuardProps } from "@/types/auth";

// ==============================|| GUEST GUARD ||============================== //

const GuestGuard: React.FC<GuardProps> = ({ children }: GuardProps) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return isLoggedIn ? <Navigate to={"/dashboard"} /> : children;
};

export default GuestGuard;
