import React from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import ReactGA from "react-ga4";

// material-ui
import { ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { CopyOutlined } from "@ant-design/icons";

// project imports
import MantisAvatar from "@/components/@extended/Avatar";
import { useGetUserSubscriptionQuery } from "@/store/services/api";

const CopyLinkButton: React.FC = () => {
  const { t } = useTranslation();
  const { data: subscribeInfo } = useGetUserSubscriptionQuery();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    if (subscribeInfo) {
      navigator.clipboard.writeText(subscribeInfo.subscribe_url).then(() => {
        enqueueSnackbar(t("notice::copy_success"), {
          variant: "success"
        });
      });

      ReactGA.event("click", {
        category: "shortcut",
        label: "quick_subscribe",
        method: "copy"
      });
    } else {
      enqueueSnackbar(t("notice::copy_fail"), {
        variant: "error"
      });
    }
  };

  return (
    <ListItem disablePadding divider>
      <ListItemButton onClick={handleClick}>
        <ListItemAvatar>
          <MantisAvatar alt="Copy" type="combined" color="secondary">
            <CopyOutlined />
          </MantisAvatar>
        </ListItemAvatar>
        <ListItemText primary={t("dashboard.shortcut.subscribe.copy")} />
      </ListItemButton>
    </ListItem>
  );
};

export default CopyLinkButton;
