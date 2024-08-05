import React from "react";
import { useTranslation } from "react-i18next";
import ReactGA from "react-ga4";

// material-ui
import { ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";

// project imports
import { useGetUserSubscriptionQuery } from "@/store/services/api";
import MantisAvatar from "@/components/@extended/Avatar";
import config from "@/config";

// asset
import surfboardIcon from "@/assets/images/software/surfboard.png";

const SurfboardButton: React.FC = () => {
  const { t } = useTranslation();
  const { data: subscribeInfo } = useGetUserSubscriptionQuery();

  const handleClick = () => {
    if (subscribeInfo) {
      const url = new URL(subscribeInfo.subscribe_url);
      url.searchParams.set("flag", "surfboard");
      window.open(
        `surge:///install-config?url=${encodeURIComponent(url.toString())}&name=${encodeURIComponent(config.title)}`,
        "_self"
      );

      ReactGA.event("click", {
        category: "shortcut",
        label: "quick_subscribe",
        method: "surfboard"
      });
    }
  };

  return (
    <ListItem disablePadding divider>
      <ListItemButton onClick={handleClick}>
        <ListItemAvatar>
          <MantisAvatar alt="Surfboard" type="combined" color="secondary" src={surfboardIcon} />
        </ListItemAvatar>
        <ListItemText primary={t("dashboard.shortcut.subscribe.surfboard")} />
      </ListItemButton>
    </ListItem>
  );
};

export default SurfboardButton;
