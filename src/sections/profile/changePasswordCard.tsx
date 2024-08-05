import React, { useCallback, useMemo } from "react";

// third-party
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import type { FormikHelpers } from "formik/dist/types";
import * as Yup from "yup";

// material-ui
import { Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";

// project imports
import MainCard from "@/components/MainCard";
import { ChangePasswordPayload } from "@/model/password";
import { BaseQueryError, useChangePasswordMutation } from "@/store/services/api";
import { useDispatch } from "@/store";
import { logout } from "@/store/reducers/auth";

type ChangePasswordFormData = ChangePasswordPayload & {
  confirm_password: string;
  submit: null;
};

const initialValues: ChangePasswordFormData = {
  old_password: "",
  new_password: "",
  confirm_password: "",
  submit: null
};

const ChangePasswordCard: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [changePassword] = useChangePasswordMutation();

  const validationSchema = useMemo(
    () =>
      Yup.object({
        old_password: Yup.string().required(
          t("profile.change-password-card.form.old_password", {
            context: "required"
          }).toString()
        ),
        new_password: Yup.string()
          .required(t("profile.change-password-card.form.new_password", { context: "required" }).toString())
          .min(8, t("profile.change-password-card.form.new_password", { context: "min", count: 8 }).toString()),
        confirm_password: Yup.string()
          .required(t("profile.change-password-card.form.confirm_password", { context: "required" }).toString())
          .oneOf(
            [Yup.ref("new_password")],
            t("profile.change-password-card.form.confirm_password", { context: "not_match" }).toString()
          )
      }),
    [t]
  );

  const handleSubmit = useCallback(
    async (
      values: ChangePasswordFormData,
      { setSubmitting, setStatus, setErrors }: FormikHelpers<ChangePasswordFormData>
    ) => {
      try {
        await changePassword(values).unwrap();
        setStatus({ success: true });
        dispatch(logout());
      } catch (_e: any) {
        const err = _e as BaseQueryError;
        console.error("Error changing password", err);
        setStatus({ success: false, message: err.message });
        setErrors(
          err.errors || {
            submit: err.message
          }
        );
      } finally {
        setSubmitting(false);
      }
    },
    [changePassword, dispatch]
  );

  return (
    <MainCard title={t("profile.change-password-card.title")}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting, values }) => (
          <Box component={"form"} onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                type={"password"}
                id={"old_password-label"}
                name={"old_password"}
                label={t("profile.change-password-card.form.old_password", { context: "label" })}
                value={values.old_password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.old_password && errors.old_password)}
                helperText={touched.old_password && errors.old_password}
                disabled={isSubmitting}
                fullWidth
              />
              <TextField
                type={"password"}
                id={"new_password-label"}
                name={"new_password"}
                label={t("profile.change-password-card.form.new_password", { context: "label" })}
                value={values.new_password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.new_password && errors.new_password)}
                helperText={touched.new_password && errors.new_password}
                disabled={isSubmitting}
                autoComplete={"new-password"}
                fullWidth
              />
              <TextField
                type={"password"}
                id={"confirm_password-label"}
                name={"confirm_password"}
                label={t("profile.change-password-card.form.confirm_password", { context: "label" })}
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.confirm_password && errors.confirm_password)}
                helperText={touched.confirm_password && errors.confirm_password}
                disabled={isSubmitting}
                autoComplete={"new-password"}
                fullWidth
              />
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Box>
                  <Typography variant={"caption"} color={"error"} noWrap>
                    {errors.submit}
                  </Typography>
                </Box>
                <Stack direction={"row"} justifyContent={"flex-end"} spacing={2}>
                  <Button type={"reset"} variant={"outlined"} disabled={isSubmitting}>
                    {t("profile.change-password-card.form.reset-button")}
                  </Button>
                  <Button type={"submit"} variant={"contained"} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <CircularProgress size={16} />
                    ) : (
                      t("profile.change-password-card.form.submit-button")
                    )}
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        )}
      </Formik>
    </MainCard>
  );
};

export default ChangePasswordCard;
