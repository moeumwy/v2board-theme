import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// material-ui
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useTheme } from "@mui/material/styles";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

// third party
import * as Yup from "yup";
import { Formik } from "formik";
import { useUnmountedRef } from "ahooks";
import lo from "lodash-es";
import OtpInput from "react18-input-otp";
import { Trans, useTranslation } from "react-i18next";

// project import
import AnimateButton from "@/components/@extended/AnimateButton";
import { useResetPasswordMutation } from "@/store/services/api";
import SendMailButton from "@/sections/auth/auth-forms/SendMailButton";
import IconButton from "@/components/@extended/IconButton";
import { StringColorProps } from "@/types/password";
import { strengthColor, strengthIndicator } from "@/utils/password-strength";
import ReactGA from "react-ga4";

// ============================|| FIREBASE - FORGOT PASSWORD ||============================ //

const AuthForgotPassword = () => {
  const theme = useTheme();
  const { t } = useTranslation("common");
  const scriptedRef = useUnmountedRef();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [resetPassword] = useResetPasswordMutation();

  const [level, setLevel] = useState<StringColorProps>();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const handlePasswordChange = (value: string) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    handlePasswordChange("");
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          password_confirm: "",
          email_code: "",
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email(t("forgot_password.email_invalid").toString())
            .max(255, t("forgot_password.email_max", { count: 255 }).toString())
            .required(t("forgot_password.email_required").toString()),
          password: Yup.string()
            .max(255, t("forgot_password.password_max", { count: 255 }).toString())
            .required(t("forgot_password.password_required").toString()),
          password_confirm: Yup.string()
            .oneOf([Yup.ref("password"), null], t("forgot_password.password_confirm_invalid").toString())
            .required(t("forgot_password.password_confirm_required").toString()),
          email_code: Yup.string()
            .min(6, t("forgot_password.email_code_min", { count: 6 }).toString())
            .max(6, t("forgot_password.email_code_max", { count: 6 }).toString())
            .required(t("forgot_password.email_code_required").toString())
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          if (values.email_code.length !== 6) {
            setStatus({ success: false });
            setErrors({ email_code: t("forgot_password.email_code_invalid").toString() });
            return;
          }

          try {
            // API call to reset the password
            await resetPassword({
              email: values.email,
              password: values.password,
              email_code: values.email_code
            }).unwrap();

            if (!scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
              enqueueSnackbar(t("notice::forgot_password.reset_success"), {
                variant: "success"
              });

              // Track the successful reset password event
              ReactGA.event("reset_password", {
                category: "auth",
                label: "reset_password",
                email: values.email,
                success: true
              });

              // Navigate to login page
              navigate("/login", { replace: true });
            }
          } catch (err) {
            console.error("Error in reset password", err);
            // Move Snackbar outside of the scriptedRef check
            enqueueSnackbar(
              err.message || t("notice::forgot_password.reset_failed"),
              { variant: "error" }
            );

            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors(err.errors || { submit: err.message });

              // Track the failed reset password event
              ReactGA.event("reset_password", {
                category: "auth",
                label: "reset_password",
                email: values.email,
                success: false,
                error: err.message
              });
            }
          } finally {
            // if (scriptedRef.current) {
              setSubmitting(false);
            // }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setValues }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Email */}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email">
                    <Trans>{"forgot_password.email"}</Trans>
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="user@example.com"
                    inputProps={{}}
                    endAdornment={<SendMailButton email={values.email} />}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {/* Email Code */}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-code-signup">
                    <Trans>{"forgot_password.email_code"}</Trans>
                  </InputLabel>
                  <OtpInput
                    value={values.email_code}
                    onChange={(otp: string) => {
                      setValues((prev) => ({
                        ...prev,
                        email_code: otp
                      }));
                    }}
                    numInputs={6}
                    containerStyle={{ justifyContent: "space-between" }}
                    inputProps={{
                      name: "email_code",
                      id: "email-code-signup",
                      onBlur: handleBlur
                    }}
                    inputStyle={{
                      width: "100%",
                      margin: "8px",
                      padding: "10px",
                      border: `1px solid ${
                        theme.palette.mode === "dark" ? theme.palette.grey[200] : theme.palette.grey[300]
                      }`,
                      borderRadius: 4,
                      ":hover": {
                        borderColor: theme.palette.primary.main
                      }
                    }}
                    focusStyle={{
                      outline: "none",
                      boxShadow: theme.customShadows.primary,
                      border: `1px solid ${theme.palette.primary.main}`
                    }}
                  />
                  {touched.email_code && errors.email_code && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email_code}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              {/* Password */}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">
                    <Trans>{"forgot_password.password"}</Trans>
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      handlePasswordChange(e.target.value);
                    }}
                    autoComplete={"new-password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: "7px" }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {t("forgot_password.password_strength", {
                          context: lo.lowerCase(level?.label)
                        }).toString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              {/* Password Confirm */}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-confirm">
                    <Trans>{"forgot_password.password_confirm"}</Trans>
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password_confirm && errors.password_confirm)}
                    id="password-confirm"
                    type={showPassword ? "text" : "password"}
                    value={values.password_confirm}
                    name="password_confirm"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      handlePasswordChange(e.target.value);
                    }}
                    autoComplete={"new-password"}
                    placeholder="******"
                    inputProps={{}}
                  />
                  {touched.password_confirm && errors.password_confirm && (
                    <FormHelperText error id="helper-text-password-confirm">
                      {errors.password_confirm}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} />
                    ) : (
                      <Trans i18nKey={"forgot_password.submit"}>重置密码</Trans>
                    )}
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthForgotPassword;
