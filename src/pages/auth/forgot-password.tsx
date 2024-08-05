import React from "react";
import { Trans } from "react-i18next";
import { Link } from "react-router-dom";

// material-ui
import { Grid, Stack, Typography } from "@mui/material";

// project import
import AuthWrapper from "@/sections/auth/AuthWrapper";
import AuthForgotPassword from "@/sections/auth/auth-forms/AuthForgotPassword";
import useTitle from "@/hooks/useTitle";

// ================================|| FORGOT PASSWORD ||================================ //

const ForgotPassword: React.FC = () => {
  useTitle("forgot-password");

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography variant="h3">
              <Trans i18nKey={"forgot_password.title"}>Forgot password</Trans>
            </Typography>
            <Typography component={Link} to={"/login"} variant="body1" sx={{ textDecoration: "none" }} color="primary">
              <Trans i18nKey={"forgot_password.back_to_login"}>Back to login</Trans>
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthForgotPassword />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default ForgotPassword;
