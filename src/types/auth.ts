import { ReactElement } from "react";

// third-party

// models
import type User from "@/model/user";

// ==============================|| AUTH TYPES  ||============================== //

export type GuardProps = {
  children: ReactElement | null;
};

export type UserProfile = {
  id?: string;
  email?: string;
  avatar?: string;
  image?: string;
  name?: string;
  role?: string;
  tier?: string;
};

export interface AuthProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
}

export interface AuthActionProps {
  type: string;
  payload?: AuthProps;
}
