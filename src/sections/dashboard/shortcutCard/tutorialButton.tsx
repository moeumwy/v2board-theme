import React from "react";

// third-party
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";

// material-ui
import { ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";

// project imports
import Avatar from "@/components/@extended/Avatar";

// assets
import { QuestionOutlined } from "@ant-design/icons";
import config from "@/config";

const TutorialButton: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/knowledge");

    ReactGA.event("click", {
      category: "shortcut",
      label: "go_tutorial"
    });
  };

  return (
    <ListItem disablePadding divider>
      <ListItemButton onClick={handleClick}>
        <ListItemAvatar>
          <Avatar alt="Basic" type="combined" color="success">
            <QuestionOutlined />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant={"body1"} noWrap>
              {t("dashboard.shortcut.tutorial.primary", { siteName: config.title })}
            </Typography>
          }
          secondary={
            <Typography variant={"caption"} color={"secondary"} noWrap>
              {t("dashboard.shortcut.tutorial.secondary")}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default TutorialButton;
