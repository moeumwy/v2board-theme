import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// material-ui
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useSnackbar } from "notistack";

// project imports
import { useDispatch } from "@/store";
import { logout } from "@/store/reducers/auth";
import config from "@/config";

// assets
import {
  LogoutOutlined,
  TransactionOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  WifiOutlined
} from "@ant-design/icons";

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

export interface MenuProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  icon: React.ReactNode;
  text: string | React.ReactNode;
}

const MenuList: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    enqueueSnackbar(t("notice::logout_success"), { variant: "success" });
    navigate(config.defaultPath, { replace: true });
  };

  const buttons = useMemo<MenuProps[]>(
    () => [
      {
        icon: <UserOutlined />,
        text: t("layout.header.profile.profile_center"),
        onClick: () => navigate("/profile")
      },
      {
        icon: <TransactionOutlined />,
        text: t("layout.header.profile.transaction_list"),
        onClick: () => navigate("/order")
      },
      {
        icon: <WifiOutlined />,
        text: t("layout.header.profile.traffic_statistics"),
        onClick: () => navigate("/traffic")
      },
      {
        icon: <UsergroupAddOutlined />,
        text: t("layout.header.profile.invitations"),
        onClick: () => navigate("/invite")
      }
    ],
    [t]
  );

  return (
    <List component="nav" sx={{ p: 0, "& .MuiListItemIcon-root": { minWidth: 32 } }}>
      {buttons.map((button, index) => (
        <ListItem disablePadding key={index}>
          <ListItemButton onClick={button.onClick}>
            <ListItemIcon>{button.icon}</ListItemIcon>
            <ListItemText
              primary={button.text}
              primaryTypographyProps={{
                noWrap: true
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
      <ListItem disablePadding>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <LogoutOutlined />
          </ListItemIcon>
          <ListItemText
            primary={t("layout.header.profile.logout")}
            primaryTypographyProps={{
              noWrap: true
            }}
          />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default MenuList;
