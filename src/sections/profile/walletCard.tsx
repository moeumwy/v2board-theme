import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// material-ui
import {
  Typography,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControlLabel,
  Switch
} from "@mui/material";

// project imports
import MainCard from "@/components/MainCard";
import KeyValueTable, { KeyValueData } from "@/components/KeyValueTable";
import { useGetUserInfoQuery, useSaveOrderMutation, useUpdateUserMutation } from "@/store/services/api";

const WalletCard: React.FC = () => {
  const { t } = useTranslation();

  const { data, isLoading } = useGetUserInfoQuery();

  const [saveForRecharge] = useSaveOrderMutation();
  const [updateAutoRenew] = useUpdateUserMutation();
  const [open, setOpen] = useState(false);
  const [autoRenew, setAutoRenew] = useState(false);
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.auto_renewal != null) {
      setAutoRenew(data.auto_renewal === 1);
    }
  }, [data?.auto_renewal]);

  const tableData = useMemo(
    () =>
    (
      [
        {
          key: t("profile.wallet-card.table.balance", { context: "key" }),
          value: t("profile.wallet-card.table.balance", {
            context: "value",
            value: ((data?.balance ?? 0) / 100).toFixed(2),
            count: (data?.balance ?? 0) / 100
          })
        },
        {
          key: t("profile.wallet-card.table.commission_balance", { context: "key" }),
          value: t("profile.wallet-card.table.commission_balance", {
            context: "value",
            value: ((data?.commission_balance ?? 0) / 100).toFixed(2),
            count: (data?.commission_balance ?? 0) / 100
          })
        }
      ] satisfies KeyValueData[]
  ).map((datum) => ({
    key: <Typography noWrap>{datum.key}</Typography>,
    value: <Typography noWrap>{datum.value}</Typography>
  })),
    [data, t]
  );

const handleRecharge = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

const handleConfirm = async () => {
  if (amount) {
    try {
      // 将用户输入的金额乘以100
      const rechargeAmount = parseFloat(amount) * 100;
      const response = await saveForRecharge({ period: 'deposit', deposit_amount: rechargeAmount, plan_id: 0 }).unwrap();

      // 获取订单号并跳转到订单页面
      const orderNumber = response;
      navigate(`/order/${orderNumber}`);

      setOpen(false);
    } catch (error) {
      console.error("Recharge failed", error);
    }
  }
};

const handleToggleAutoRenew = async () => {
  try {
    const newAutoRenewState = !autoRenew;
    setAutoRenew(newAutoRenewState);
    await updateAutoRenew({ auto_renewal: newAutoRenewState ? 1 : 0 }).unwrap(); // 更新 auto_renewal 值
  } catch (error) {
    console.error("Failed to update auto-renew status", error);
    setAutoRenew((prev) => !prev); // 恢复之前状态
  }
};

return (
  <>
    <MainCard title={t("profile.wallet-card.title")}>
      <KeyValueTable data={tableData} isValueLoading={isLoading} />
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <FormControlLabel
          control={
            <Switch
              checked={autoRenew}
              onChange={handleToggleAutoRenew}
              color="primary"
            />
          }
          label={t("profile.wallet-card.auto-renew")}
        />
        <Button variant="contained" color="primary" onClick={handleRecharge}>
          {t("profile.wallet-card.button")}
        </Button>
      </Box>
    </MainCard>

    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t("profile.wallet-card.recharge-dialog.title")}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={t("profile.wallet-card.recharge-dialog.amount-label")}
          type="number"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          {t("profile.wallet-card.recharge-dialog.cancel")}
        </Button>
        <Button onClick={handleConfirm} color="primary">
          {t("profile.wallet-card.recharge-dialog.confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  </>
);
};

export default WalletCard;
