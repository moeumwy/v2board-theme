import React, { useState } from "react";

// third party
import { useToggle } from "ahooks";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import lo from "lodash-es";
import { useNavigate } from "react-router-dom";

// material-ui
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material";

// project import
import MainCard from "@/components/MainCard";
import config from "@/config";
import { WithdrawPayload } from "@/model/withdraw";
import {
  useGetInviteDataQuery,
  useGetUserConfigQuery,
  useTransferMoneyMutation,
  useWithdrawMoneyMutation
} from "@/store/services/api";
import { makeStyles } from "@/themes/hooks";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles()((theme) => ({
  root: {},
  form: {
    backgroundColor: "transparent"
  }
}));

const TransferButton: React.FC = () => {
  const { t } = useTranslation();
  const { data } = useGetInviteDataQuery();
  const [transfer] = useTransferMoneyMutation();
  const { classes } = useStyles();
  const theme = useTheme();

  const [open, { setLeft: setClose, setRight: setOpen }] = useToggle(false);

  return (
    <>
      <Button variant={"contained"} onClick={setOpen}>
        {t("invite.my-invite.invitation-card.transfer-button")}
      </Button>
      <Dialog open={open} onClose={setClose} fullWidth>
        <DialogTitle>{t("invite.my-invite.invitation-card.transfer-dialog.title")}</DialogTitle>
        <Formik
          initialValues={{
            transfer_amount: 0
          }}
          validationSchema={Yup.object().shape({
            transfer_amount: Yup.number()
              .min(
                0.01,
                t("invite.my-invite.invitation-card.transfer-dialog.validation_min", { count: 0.1 }).toString()
              )
              .max(
                (data?.stat[4] ?? 0) / 100,
                t("invite.my-invite.invitation-card.transfer-dialog.validation_max", {
                  count: (data?.stat[4] ?? 0) / 100
                }).toString()
              )
              .required(t("invite.my-invite.invitation-card.transfer-dialog.validation_required").toString())
          })}
          onSubmit={async (values, { setSubmitting, setErrors, setStatus }) => {
            try {
              setSubmitting(true);
              await transfer(values.transfer_amount * 100).unwrap();
              setStatus({ success: true });
              setClose();
            } catch (err: any) {
              setErrors(lo.isEmpty(err.errors) ? { transfer_amount: err.message } : err.errors);
              setStatus({ success: false });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched }) => (
            <Box component={Form} onSubmit={handleSubmit} className={classes.form}>
              <DialogContent>
                <Stack spacing={3}>
                  <Alert severity={"info"}>
                    {t("invite.my-invite.invitation-card.transfer-dialog.info", {
                      siteName: config.title
                    })}
                  </Alert>
                  <TextField
                    id={"total-amount"}
                    type={"number"}
                    disabled
                    fullWidth
                    value={(data?.stat[4] ?? 0) / 100}
                    label={t("invite.my-invite.invitation-card.transfer-dialog.total-amount", { context: "label" })}
                    variant={"standard"}
                  />
                  <TextField
                    id={"transfer-amount"}
                    name={"transfer_amount"}
                    type={"number"}
                    value={values.transfer_amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label={t("invite.my-invite.invitation-card.transfer-dialog.transfer-amount", { context: "label" })}
                    fullWidth
                    disabled={isSubmitting}
                    helperText={errors.transfer_amount && touched.transfer_amount ? errors.transfer_amount : undefined}
                    error={Boolean(touched.transfer_amount && errors.transfer_amount)}
                    variant={"standard"}
                  />
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={setClose}>
                  {t("invite.my-invite.invitation-card.transfer-dialog.cancel-button")}
                </Button>
                <Button type={"submit"} variant={"contained"} disabled={isSubmitting}>
                  {t("invite.my-invite.invitation-card.transfer-dialog.confirm-button")}
                </Button>
              </DialogActions>
            </Box>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

const WithdrawButton: React.FC = () => {
  const [skip, setSkip] = useState(true);
  const [open, { setLeft: setClose, setRight: setOpen }] = useToggle(false);

  const { t } = useTranslation();
  const { data } = useGetInviteDataQuery();
  const { data: userConfigData } = useGetUserConfigQuery(undefined, {
    skip
  });
  const [withdrew] = useWithdrawMoneyMutation();

  const navigate = useNavigate();
  const { classes } = useStyles();

  return (
    <>
      <Button
        variant={"outlined"}
        onClick={() => {
          setOpen();
          setSkip(false);
        }}
      >
        {t("invite.my-invite.invitation-card.withdraw-button")}
      </Button>
      <Dialog open={open} onClose={setClose} fullWidth>
        <DialogTitle>{t("invite.my-invite.invitation-card.withdraw-dialog.title")}</DialogTitle>
        <Formik
          initialValues={
            {
              withdraw_method: userConfigData?.withdraw_methods[0] ?? "",
              withdraw_account: ""
            } as WithdrawPayload
          }
          validationSchema={Yup.object().shape({
            withdraw_method: Yup.string().required(
              t("invite.my-invite.invitation-card.withdraw-dialog.validation_required", {
                name: t("invite.my-invite.invitation-card.withdraw-dialog.withdraw-method", { context: "label" })
              }).toString()
            ),
            withdraw_account: Yup.string().required(
              t("invite.my-invite.invitation-card.withdraw-dialog.validation_required", {
                name: t("invite.my-invite.invitation-card.withdraw-dialog.withdraw-account", { context: "label" })
              }).toString()
            )
          })}
          onSubmit={async (values, { setSubmitting, setErrors, setStatus }) => {
            try {
              await withdrew(values).unwrap();
              setStatus({ success: true });
              navigate("/ticket");
              setClose();
            } catch (err: any) {
              setErrors(lo.isEmpty(err.errors) ? { withdraw_account: err.message } : err.errors);
              setStatus({ success: false });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched }) => (
            <Box component={Form} onSubmit={handleSubmit} className={classes.form}>
              <DialogContent>
                <Stack spacing={3}>
                  <Alert severity={"info"} color={"info"}>
                    {t("invite.my-invite.invitation-card.withdraw-dialog.info", {
                      siteName: config.title,
                      amount: (data?.stat[4] ?? 0) / 100
                    })}
                  </Alert>
                  <FormControl fullWidth variant={"standard"}>
                    <InputLabel id="select-payment-label">
                      {t("invite.my-invite.invitation-card.withdraw-dialog.withdraw-method", {
                        context: "label"
                      })}
                    </InputLabel>
                    <Select
                      labelId="select-payment-label"
                      id="select-payment"
                      name={"withdraw_method"}
                      value={values.withdraw_method}
                      label={t("invite.my-invite.invitation-card.withdraw-dialog.withdraw-method", {
                        context: "label"
                      })}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                    >
                      {userConfigData?.withdraw_methods.map((method) => (
                        <MenuItem value={method} key={method}>
                          {method}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.withdraw_method && touched.withdraw_method && (
                      <FormHelperText error>{errors.withdraw_method}</FormHelperText>
                    )}
                  </FormControl>
                  <TextField
                    id={"withdraw-account"}
                    name={"withdraw_account"}
                    type={"text"}
                    value={values.withdraw_account}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label={t("invite.my-invite.invitation-card.withdraw-dialog.withdraw-account", {
                      context: "label"
                    })}
                    fullWidth
                    disabled={isSubmitting}
                    helperText={
                      errors.withdraw_account && touched.withdraw_account ? errors.withdraw_account : undefined
                    }
                    error={Boolean(touched.withdraw_account && errors.withdraw_account)}
                    variant={"standard"}
                  />
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={setClose}>
                  {t("invite.my-invite.invitation-card.withdraw-dialog.cancel-button")}
                </Button>
                <Button type={"submit"} variant={"contained"} disabled={isSubmitting}>
                  {t("invite.my-invite.invitation-card.withdraw-dialog.confirm-button")}
                </Button>
              </DialogActions>
            </Box>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

const MyInvitationCard: React.FC = () => {
  const { t } = useTranslation();
  const { data } = useGetInviteDataQuery();

  return (
    <MainCard
      title={t("invite.my-invite.invitation-card.title")}
      sx={{
        height: 240
      }}
    >
      <Stack spacing={2}>
        <Stack direction={"row"} spacing={2} alignItems={"flex-end"}>
          <Typography variant={"h2"} component={"span"}>
            {Number((data?.stat[4] ?? 0) / 100).toFixed(2)}
          </Typography>
          <Typography variant={"h6"} component={"span"} color={"textSecondary"}>
            {t("invite.my-invite.invitation-card.currency")}
          </Typography>
        </Stack>
        <Box>
          <Typography variant={"subtitle1"}>{t("invite.my-invite.invitation-card.description")}</Typography>
          <Typography variant={"body2"} color={"textSecondary"} noWrap>
            {t("invite.my-invite.invitation-card.helperText")}
          </Typography>
        </Box>
        <Stack direction={"row"} spacing={2}>
          <TransferButton />
          <WithdrawButton />
        </Stack>
      </Stack>
    </MainCard>
  );
};

export default MyInvitationCard;
