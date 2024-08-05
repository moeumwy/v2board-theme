// project import
import { NavItemType } from "@/types/menu";
import {
  DashboardOutlined,
  LineChartOutlined,
  MonitorOutlined,
  ProfileOutlined,
  ReadOutlined,
  ShoppingOutlined,
  TeamOutlined,
  ToolOutlined,
  UnorderedListOutlined
} from "@ant-design/icons";

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [
    {
      id: "app",
      title: "app",
      type: "group",
      children: [
        {
          id: "dashboard",
          title: "dashboard",
          type: "item",
          url: "/dashboard",
          icon: DashboardOutlined
        },
        {
          id: "knowledge",
          title: "knowledge",
          type: "item",
          url: "/knowledge",
          icon: ReadOutlined
        }
      ]
    },
    {
      id: "subscription",
      title: "subscription",
      type: "group",
      children: [
        {
          id: "buy-plan",
          title: "buy-plan",
          type: "item",
          url: "/plan/buy",
          icon: ShoppingOutlined
        },
        {
          id: "node-status",
          title: "node-status",
          type: "item",
          url: "/node/status",
          icon: MonitorOutlined
        },
        {
          id: "order-list",
          title: "order-list",
          type: "item",
          url: "/order",
          icon: UnorderedListOutlined
        }
      ]
    },
    {
      id: "user",
      title: "user",
      type: "group",
      children: [
        {
          id: "invitation",
          title: "invitation",
          type: "collapse",
          icon: TeamOutlined,
          children: [
            {
              id: "invite",
              title: "invite",
              type: "item",
              url: "/invite"
            },
            {
              id: "invite-commissions",
              title: "invite-commissions",
              type: "item",
              url: "/invite/commissions"
            }
          ]
        },
        {
          id: "profile",
          title: "profile",
          type: "item",
          url: "/profile",
          icon: ProfileOutlined
        }
      ]
    },
    {
      id: "service",
      title: "service",
      type: "group",
      children: [
        {
          id: "ticket",
          title: "ticket",
          type: "item",
          icon: ToolOutlined,
          url: "/ticket",
          breadcrumbs: false
        },
        {
          id: "traffic",
          title: "traffic",
          type: "item",
          icon: LineChartOutlined,
          url: "/traffic"
        }
      ]
    }
  ]
};

export default menuItems;
