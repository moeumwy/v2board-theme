import { lazy } from "react";

// project import
import MainLayout from "@/layout/MainLayout";
// import CommonLayout from "@/layout/CommonLayout";
import Loadable from "@/components/Loadable";
import AuthGuard from "@/middleware/route-guard/AuthGuard";
import { Navigate, RouteObject } from "react-router";

// pages routing
const MaintenanceError = Loadable(lazy(() => import("@/pages/maintenance/404")));
// const MaintenanceError500 = Loadable(lazy(() => import("@/pages/maintenance/500")));
// const MaintenanceUnderConstruction = Loadable(lazy(() => import("@/pages/maintenance/under-construction")));
// const MaintenanceComingSoon = Loadable(lazy(() => import("@/pages/maintenance/coming-soon")));

// render
const Dashboard = Loadable(lazy(() => import("@/pages/dashboard")));
const Knowledge = Loadable(lazy(() => import("@/pages/knowledge")));
const KnowledgePost = Loadable(lazy(() => import("@/pages/knowledge/[id]")));
const PlanBuy = Loadable(lazy(() => import("@/pages/plan/buy")));
const PlanDetails = Loadable(lazy(() => import("@/pages/plan/buy/[id]")));
const OrderList = Loadable(lazy(() => import("@/pages/order")));
const Checkout = Loadable(lazy(() => import("@/pages/order/[id]")));
const NodeStatus = Loadable(lazy(() => import("@/pages/node/status")));
const Invite = Loadable(lazy(() => import("@/pages/invite")));
const InviteCommissions = Loadable(lazy(() => import("@/pages/invite/commissions")));
const Profile = Loadable(lazy(() => import("@/pages/profile")));
const Ticket = Loadable(lazy(() => import("@/pages/ticket")));
const TicketId = Loadable(lazy(() => import("@/pages/ticket/[id]")));
const Traffic = Loadable(lazy(() => import("@/pages/traffic")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes: RouteObject = {
  path: "/",
  children: [
    {
      path: "/",
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: "/",
          element: <Navigate to={"/dashboard"} />
        },
        {
          path: "dashboard",
          element: <Dashboard />
        },
        {
          path: "knowledge",
          element: <Knowledge />
        },
        {
          path: "knowledge/:id",
          element: <KnowledgePost />
        },
        {
          path: "plan/buy",
          element: <PlanBuy />
        },
        {
          path: "plan/buy/:id",
          element: <PlanDetails />
        },
        {
          path: "order",
          element: <OrderList />
        },
        {
          path: "order/:id",
          element: <Checkout />
        },
        {
          path: "node/status",
          element: <NodeStatus />
        },
        {
          path: "invite",
          element: <Invite />
        },
        {
          path: "invite/commissions",
          element: <InviteCommissions />
        },
        {
          path: "profile",
          element: <Profile />
        },
        {
          path: "ticket",
          element: <Ticket />
        },
        {
          path: "ticket/:id",
          element: <TicketId />
        },
        {
          path: "traffic",
          element: <Traffic />
        }
      ]
    },
    {
      path: "*",
      element: <MaintenanceError />
    }
    // {
    //   path: "/maintenance",
    //   element: <CommonLayout />,
    //   children: [
    //     {
    //       path: "404",
    //       element: <MaintenanceError />
    //     },
    //     {
    //       path: "500",
    //       element: <MaintenanceError500 />
    //     },
    //     {
    //       path: "under-construction",
    //       element: <MaintenanceUnderConstruction />
    //     },
    //     {
    //       path: "coming-soon",
    //       element: <MaintenanceComingSoon />
    //     }
    //   ]
    // }
  ]
};

export default MainRoutes;
