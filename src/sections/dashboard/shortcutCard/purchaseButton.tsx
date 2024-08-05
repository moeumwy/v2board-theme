import React, { useMemo } from "react";

// third-party
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";

// material-ui
import { ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";

// project imports
import Avatar from "@/components/@extended/Avatar";
import { useGetUserInfoQuery } from "@/store/services/api";

// assets
import { ShoppingOutlined } from "@ant-design/icons";

const PurchaseButton: React.FC = () => {
  const { t } = useTranslation();
  const { data: userInfo } = useGetUserInfoQuery();
  const hasPurchased = useMemo<boolean>(() => userInfo?.plan_id !== null, [userInfo]);

  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(hasPurchased ? `/plan/buy/${userInfo?.plan_id}` : "/plan/buy");

    ReactGA.event("click", {
      category: "shortcut",
      label: "go_purchase"
    });
  };

  return (
    <ListItem disablePadding divider>
      <ListItemButton onClick={handleClick}>
        <ListItemAvatar>
          <Avatar alt="Basic" type="combined" color="warning">
            <ShoppingOutlined />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant={"body1"} noWrap>
              {t("dashboard.shortcut.purchase.primary", {
                context: hasPurchased ? "purchased" : "not_purchased"
              })}
            </Typography>
          }
          secondary={
            <Typography variant={"caption"} color={"secondary"} noWrap>
              {t("dashboard.shortcut.purchase.secondary", {
                context: hasPurchased ? "purchased" : "not_purchased"
              })}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default PurchaseButton;
