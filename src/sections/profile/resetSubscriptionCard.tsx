import React, { useCallback } from "react";

// third-party
import { useToggle } from "ahooks";
import { useTranslation } from "react-i18next";

// material-ui
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";

// project imports
import MainCard from "@/components/MainCard";
import { useResetSecurityMutation } from "@/store/services/api";

const ResetSubscriptionCard: React.FC = () => {
  const { t } = useTranslation();
  const [open, { setLeft: setClose, setRight: setOpen }] = useToggle(false);
  const { enqueueSnackbar } = useSnackbar();

  const [reset, { isLoading: isResetting }] = useResetSecurityMutation();
  const handleClick = useCallback(async () => {
    try {
      await reset().unwrap();
      enqueueSnackbar(t("notice::reset-security", { context: "success" }), { variant: "success" });
    } catch (err: any) {
      console.error(err);
      enqueueSnackbar(t("notice::reset-security", { context: "failed" }), { variant: "error" });
    } finally {
      setClose();
    }
  }, [reset, enqueueSnackbar, t, setClose]);

  return (
    <>
      <MainCard title={t("profile.reset-subscription-card.title")}>
        <Stack spacing={2}>
          <Alert severity="warning">{t("profile.reset-subscription-card.alert")}</Alert>
          <Button variant="contained" color="error" fullWidth onClick={setOpen}>
            {t("profile.reset-subscription-card.button")}
          </Button>
        </Stack>
      </MainCard>
      <Dialog open={open} onClose={setClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{t("profile.reset-subscription-card.dialog.title")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("profile.reset-subscription-card.dialog.content")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={setClose} color="primary">
            {t("profile.reset-subscription-card.dialog.cancel")}
          </Button>
          <LoadingButton onClick={handleClick} color="error" loading={isResetting}>
            {t("profile.reset-subscription-card.dialog.confirm")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ResetSubscriptionCard;
