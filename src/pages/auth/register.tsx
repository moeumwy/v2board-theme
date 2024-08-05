import React from "react";
import { Link } from "react-router-dom";
import { Trans } from "react-i18next";

// material-ui
import { Grid, Stack, Typography } from "@mui/material";

// project import
import AuthWrapper from "@/sections/auth/AuthWrapper";
import AuthRegister from "@/sections/auth/auth-forms/AuthRegister";
import useTitle from "@/hooks/useTitle";

// ================================|| REGISTER ||================================ //

const Register: React.FC = () => {
  useTitle("register");

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
              <Trans>{"register.title"}</Trans>
            </Typography>
            <Typography component={Link} to={"/login"} variant="body1" sx={{ textDecoration: "none" }} color="primary">
              <Trans>{"register.go-login"}</Trans>
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthRegister />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Register;
