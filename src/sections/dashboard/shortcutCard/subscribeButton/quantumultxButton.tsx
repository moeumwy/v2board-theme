import React from "react";
import { useTranslation } from "react-i18next";
import ReactGA from "react-ga4";

// material-ui
import { ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";

// project imports
import { useGetUserSubscriptionQuery } from "@/store/services/api";
import MantisAvatar from "@/components/@extended/Avatar";
import config from "@/config";

// assets
import quantumultxIcon from "@/assets/images/software/quantumultx.png";

const QuantumultXButton: React.FC = () => {
  const { t } = useTranslation();
  const { data: subscribeInfo } = useGetUserSubscriptionQuery();

  const handleClick = () => {
    if (subscribeInfo) {
      const url = new URL(subscribeInfo.subscribe_url);
      url.searchParams.set("flag", "quantumult x");
      window.open(
        `quantumult-x:///update-configuration?remote-resource=${encodeURI(
          JSON.stringify({
            server_remote: [`"${url.toString()}, tag=${config.title}"`]
          })
        )}`,
        "_self"
      );

      ReactGA.event("click", {
        category: "shortcut",
        label: "quick_subscribe",
        method: "quantumult-x"
      });
    }
  };

  return (
    <ListItem disablePadding divider>
      <ListItemButton onClick={handleClick}>
        <ListItemAvatar>
          <MantisAvatar alt="Quantumult X" type="combined" color="secondary" src={quantumultxIcon} />
        </ListItemAvatar>
        <ListItemText primary={t("dashboard.shortcut.subscribe.quantumultx")} />
      </ListItemButton>
    </ListItem>
  );
};

export default QuantumultXButton;
