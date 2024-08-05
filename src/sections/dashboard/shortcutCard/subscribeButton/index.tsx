import React, { useCallback, useMemo, useState } from "react";

// material-ui
import {
  Button,
  Dialog,
  DialogTitle,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery
} from "@mui/material";
import { CloudDownloadOutlined } from "@ant-design/icons";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";

// third-party
import { useTranslation } from "react-i18next";
import UAParser from "ua-parser-js";
import { useNavigate } from "react-router-dom";

// project imports
import MantisAvatar from "@/components/@extended/Avatar";
import CopyLinkButton from "./copyLinkButton";
import ScanQRCodeButton from "./scanQrCodeButton";
import ClashButton from "./clashButton";
import ClashXButton from "./clashxButton";
import SurfboardButton from "./surfboardButton";
import SurgeButton from "./surgeButton";
import ShadowrocketButton from "./shadowrocketButton";
import QuantumultXButton from "./quantumultxButton";
import StashButton from "./stashButton";
import { useGetUserSubscriptionQuery } from "@/store/services/api";

const SubscribeButton: React.FC = () => {
  const { t } = useTranslation();
  const { data } = useGetUserSubscriptionQuery();

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const Modal = useMemo(() => (isMobile ? Drawer : Dialog), [isMobile, window.innerWidth]);

  const UserAgentData = useMemo(() => new UAParser(window.navigator.userAgent).getResult(), []);
  console.log("UserAgentData", UserAgentData);

  const buttons = useMemo(() => {
    switch (UserAgentData.os.name) {
      case "Windows":
        return [ClashButton];
      case "Android":
        return [ClashButton, SurfboardButton];
      case "Mac OS":
        return [ClashXButton, SurgeButton];
      case "iOS":
        return [ShadowrocketButton, QuantumultXButton, SurgeButton, StashButton];
      case "Linux":
        return [ClashButton];
      default:
        return [];
    }
  }, [UserAgentData.os.name]);

  const handleClick = useCallback(() => {
    if (data?.plan_id === null) {
      enqueueSnackbar(t("notice::no-subscription"), {
        variant: "warning",
        action: (
          <Button
            color="inherit"
            size="small"
            onClick={() => {
              navigate("/plan/buy");
            }}
          >
            {t("dashboard.shortcut.subscribe.buy-button")}
          </Button>
        )
      });
      return;
    }

    setOpen(true);
  }, [data, enqueueSnackbar, navigate, t]);

  return (
    <>
      <ListItem disablePadding divider>
        <ListItemButton onClick={handleClick}>
          <ListItemAvatar>
            <MantisAvatar alt="Subscribe" type="combined" color="info">
              <CloudDownloadOutlined />
            </MantisAvatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography variant={"body1"} noWrap>
                {t("dashboard.shortcut.subscribe.primary")}
              </Typography>
            }
            secondary={
              <Typography variant={"caption"} color={"secondary"} noWrap>
                {t("dashboard.shortcut.subscribe.secondary")}
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>
      <Modal open={open} onClose={() => setOpen(false)} anchor={"bottom"}>
        <DialogTitle>{t("dashboard.shortcut.subscribe.primary")}</DialogTitle>
        <List
          sx={{
            pt: 0,
            minWidth: {
              xs: 0,
              sm: 300
            }
          }}
        >
          <CopyLinkButton />
          <ScanQRCodeButton />
          {buttons.map((Button, index) => (
            <Button key={index} />
          ))}
        </List>
      </Modal>
    </>
  );
};

export default SubscribeButton;
