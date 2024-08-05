import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

// material-ui
import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";
import { Trans, useTranslation } from "react-i18next";
import lo from "lodash-es";
import { useUnmountedRef } from "ahooks";
import ReactGA from "react-ga4";

// project import
import { useSelector } from "@/store";
import { useLoginMutation } from "@/store/services/api";
import IconButton from "@/components/@extended/IconButton";
import AnimateButton from "@/components/@extended/AnimateButton";

// assets
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  const [capsWarning, setCapsWarning] = React.useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const [login] = useLoginMutation();
  const scriptedRef = useUnmountedRef();

  const { t } = useTranslation("common", {
    keyPrefix: "login"
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  const onKeyDown = (keyEvent: any) => {
    if (keyEvent.getModifierState("CapsLock")) {
      setCapsWarning(true);
    } else {
      setCapsWarning(false);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email(t("email_invalid").toString()).max(255).required(t("email_required").toString()),
          password: Yup.string().max(255).required(t("password_required").toString())
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setSubmitting(true);

            await login(values)
              .unwrap()
              .then(() => {
                setStatus({ success: true });
                ReactGA.event("login", {
                  category: "auth",
                  label: "login",
                  method: "email",
                  success: true,
                  email: values.email
                });
                navigate("/dashboard", { replace: true });
              })
              .catch((err: any) => {
                setStatus({ success: false });
                setErrors(lo.isEmpty(err.errors) ? { submit: err.message } : err.errors);
                ReactGA.event("login", {
                  category: "auth",
                  label: "login",
                  method: "email",
                  success: false,
                  error: err.message,
                  email: values.email,
                  values
                });
              })
              .finally(() => {
                setSubmitting(false);
              });
          } catch (err: any) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors(lo.isEmpty(err.errors) ? { submit: err.message } : err.errors);
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <Box component={"form"} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">
                    <Trans>{"login.email"}</Trans>
                  </InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={t("email_placeholder").toString()}
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">
                    <Trans>{"login.password"}</Trans>
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    color={capsWarning ? "warning" : "primary"}
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    name="password"
                    onBlur={(event: React.FocusEvent<any, Element>) => {
                      setCapsWarning(false);
                      handleBlur(event);
                    }}
                    onKeyDown={onKeyDown}
                    onChange={handleChange}
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
                    placeholder={t("password_placeholder").toString()}
                  />
                  {capsWarning && (
                    <Typography
                      variant="caption"
                      sx={{ color: "warning.main" }}
                      id="warning-helper-text-password-login"
                    >
                      <Trans ns={"notice"}>{"capslock_on"}</Trans>
                    </Typography>
                  )}
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <Box />
                  <Link
                    variant="h6"
                    component={RouterLink}
                    to={isLoggedIn ? "/auth/forgot-password" : "/forgot-password"}
                    color="text.primary"
                  >
                    {t("forgot_password").toString()}
                  </Link>
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
                    {isSubmitting ? <CircularProgress size={24} /> : <Trans i18nKey={"login.submit"}>Submit</Trans>}
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
