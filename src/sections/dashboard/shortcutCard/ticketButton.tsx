import React from "react";

// third-party
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";

// material-ui
import { ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import { CommentOutlined } from "@ant-design/icons";

// project imports
import Avatar from "@/components/@extended/Avatar";

const TicketButton: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/ticket");

    ReactGA.event("click", {
      category: "shortcut",
      label: "go_ticket"
    });
  };

  return (
    <ListItem disablePadding divider>
      <ListItemButton onClick={handleClick}>
        <ListItemAvatar>
          <Avatar alt="Basic" type="combined" color="default">
            <CommentOutlined />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant={"body1"} noWrap>
              {t("dashboard.shortcut.ticket.primary")}
            </Typography>
          }
          secondary={
            <Typography variant={"caption"} color={"secondary"} noWrap>
              {t("dashboard.shortcut.ticket.secondary")}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default TicketButton;
