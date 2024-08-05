import React from "react";
import { Link } from "react-router-dom";
import { Trans } from "react-i18next";

// material-ui
import { Grid, Stack, Typography } from "@mui/material";

// project import
import AuthWrapper from "@/sections/auth/AuthWrapper";
import AuthLogin from "@/sections/auth/auth-forms/AuthLogin";
import useTitle from "@/hooks/useTitle";

// ================================|| LOGIN ||================================ //

const Login: React.FC = () => {
  useTitle("login");

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
              <Trans>{"login.title"}</Trans>
            </Typography>
            <Typography
              component={Link}
              to={"/register"}
              variant="body1"
              sx={{ textDecoration: "none" }}
              color="primary"
            >
              <Trans>{"login.go-register"}</Trans>
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;
