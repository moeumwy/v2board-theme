import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { QRCodeCanvas } from "qrcode.react";

// material-ui
import {
  Dialog,
  DialogContent,
  DialogTitle,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography
} from "@mui/material";
import { QrcodeOutlined } from "@ant-design/icons";

// project imports
import MantisAvatar from "@/components/@extended/Avatar";
import { useGetUserSubscriptionQuery } from "@/store/services/api";

const ScanQRCodeButton: React.FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { data: subscribeInfo } = useGetUserSubscriptionQuery();

  return (
    <>
      <ListItem disablePadding divider>
        <ListItemButton onClick={() => setOpen(true)}>
          <ListItemAvatar>
            <MantisAvatar alt="Scan QRCode" type="combined" color="secondary">
              <QrcodeOutlined />
            </MantisAvatar>
          </ListItemAvatar>
          <ListItemText primary={t("dashboard.shortcut.subscribe.scan")} />
        </ListItemButton>
      </ListItem>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{t("dashboard.shortcut.subscribe.scan")}</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          {subscribeInfo && <QRCodeCanvas value={subscribeInfo.subscribe_url} level={"Q"} includeMargin size={256} />}
          <Typography variant="body2" color="textSecondary">
            {t("dashboard.shortcut.subscribe.scan_tips")}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ScanQRCodeButton;
