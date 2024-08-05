import React, { useCallback } from "react";

// third-party
import { useToggle } from "ahooks";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

// material-ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// project imports
import { useTicketContext } from "../../context";
import { useCloseTicketMutation } from "@/store/services/api";

// assets
import { CloseOutlined } from "@ant-design/icons";

const CloseButton: React.FC = () => {
  const { t } = useTranslation();
  const [open, { set: setOpen }] = useToggle(false);
  const { enqueueSnackbar } = useSnackbar();

  const {
    ticketQuery: { data: ticket }
  } = useTicketContext();
  const [closeTicket, { isLoading }] = useCloseTicketMutation();

  const handleClick = useCallback(async () => {
    if (!ticket) return;

    try {
      await closeTicket(ticket.id).unwrap();
      enqueueSnackbar(t("notice::close-ticket", { context: "success" }), { variant: "success" });
      setOpen(false);
    } catch (error) {
      console.error("error closing ticket", error);
      enqueueSnackbar(t("notice::close-ticket", { context: "failed" }), { variant: "error" });
    }
  }, [t, ticket]);

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <CloseOutlined />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{t("ticket.header.close_dialog.title")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("ticket.header.close_dialog.content")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>{t("ticket.header.close_dialog.cancel-button")}</Button>
          <LoadingButton onClick={handleClick} loading={isLoading} variant={"contained"} color={"error"}>
            {t("ticket.header.close_dialog.confirm-button")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CloseButton;
