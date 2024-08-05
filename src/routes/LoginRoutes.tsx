import React, { lazy } from "react";
import { Navigate, RouteObject } from "react-router";

// project import
import GuestGuard from "@/middleware/route-guard/GuestGuard";
import CommonLayout from "@/layout/CommonLayout";
import Loadable from "@/components/Loadable";

// render - login
const AuthLogin = Loadable(lazy(() => import("@/pages/auth/login")));
const AuthRegister = Loadable(lazy(() => import("@/pages/auth/register")));
const AuthForgotPassword = Loadable(lazy(() => import("@/pages/auth/forgot-password")));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes: RouteObject = {
  path: "/",
  children: [
    {
      path: "/",
      element: (
        <GuestGuard>
          <CommonLayout layout={"blank"} />
        </GuestGuard>
      ),
      children: [
        {
          path: "/",
          element: <Navigate to={"/login"} />
        },
        {
          path: "login",
          element: <AuthLogin />
        },
        {
          path: "register",
          element: <AuthRegister />
        },
        {
          path: "forgot-password",
          element: <AuthForgotPassword />
        }
        // {
        //   path: "reset-password",
        //   element: <AuthResetPassword />
        // }
        // {
        //   path: "check-mail",
        //   element: <AuthCheckMail />
        // },
        // {
        //   path: "code-verification",
        //   element: <AuthCodeVerification />
        // }
      ]
    }
  ]
};

export default LoginRoutes;
