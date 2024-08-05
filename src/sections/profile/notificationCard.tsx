import React, { useCallback, useMemo } from "react";

// third-party
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import { FormikHelpers } from "formik/dist/types";

// material-ui
import { Box, FormControlLabel, Stack, Switch } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";

// project imports
import MainCard from "@/components/MainCard";
import { useGetUserInfoQuery, useUpdateUserMutation } from "@/store/services/api";

type NotificationCardFormData = {
  remind_expire: boolean;
  remind_traffic: boolean;
};

const NotificationCard: React.FC = () => {
  const { t } = useTranslation();
  const { data: userInfoData, isLoading } = useGetUserInfoQuery();
  const [updateUser] = useUpdateUserMutation();
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = useMemo<NotificationCardFormData>(
    () => ({
      remind_expire: userInfoData?.remind_expire === 1,
      remind_traffic: userInfoData?.remind_traffic === 1
    }),
    [userInfoData]
  );

  const handleSubmit = useCallback(
    async (
      values: NotificationCardFormData,
      { setSubmitting, setStatus, setErrors }: FormikHelpers<NotificationCardFormData>
    ) => {
      try {
        await updateUser({
          remind_expire: values.remind_expire ? 1 : 0,
          remind_traffic: values.remind_traffic ? 1 : 0
        }).unwrap();
        setStatus({ success: true });
        enqueueSnackbar(t("notice::update-user", { context: "success" }), { variant: "success" });
      } catch (err: any) {
        setStatus({ success: false });
        setErrors(err.errors || { submit: err.message });
      } finally {
        setSubmitting(false);
      }
    },
    [enqueueSnackbar, t]
  );

  return (
    <MainCard title={t("profile.notification-card.title")}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
        {({ values, handleChange, handleSubmit, handleBlur, isSubmitting }) => (
          <Box component={Form} onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControlLabel
                control={<Switch />}
                name={"remind_expire"}
                checked={values.remind_expire}
                disabled={isLoading || isSubmitting}
                onChange={handleChange}
                onBlur={handleBlur}
                label={t("profile.notification-card.expired_notify", { context: "label" })}
                labelPlacement={"end"}
                sx={{
                  m: 0
                }}
              />
              <FormControlLabel
                control={<Switch />}
                name={"remind_traffic"}
                checked={values.remind_traffic}
                disabled={isLoading || isSubmitting}
                onChange={handleChange}
                onBlur={handleBlur}
                label={t("profile.notification-card.traffic_notify", { context: "label" })}
                labelPlacement={"end"}
                sx={{
                  m: 0
                }}
              />
              <Stack direction={"row"} justifyContent={"flex-end"}>
                <LoadingButton variant={"contained"} type={"submit"} loading={isLoading || isSubmitting}>
                  {t("profile.notification-card.save-button")}
                </LoadingButton>
              </Stack>
            </Stack>
          </Box>
        )}
      </Formik>
    </MainCard>
  );
};

export default NotificationCard;
