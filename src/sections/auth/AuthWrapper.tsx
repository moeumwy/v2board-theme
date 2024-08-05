import React, { ReactNode } from "react";

// material-ui
import { Box, Grid } from "@mui/material";

// project import
import AuthFooter from "@/components/cards/AuthFooter";
import Logo from "@/components/logo";
import AuthCard from "./AuthCard";
import { makeStyles } from "@/themes/hooks";

// assets
import AuthBackground from "@/assets/images/auth/AuthBackground";

interface Props {
  children: ReactNode;
}

const useStyles = makeStyles({
  name: "AuthWrapper"
})((theme) => ({
  root: { minHeight: "100vh" },
  logoGrid: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(3)
  },
  authCardGrid: {
    minHeight: "calc(100vh - 210px)",
    [theme.breakpoints.up("sm")]: {
      minHeight: "calc(100vh - 134px)"
    },
    [theme.breakpoints.up("md")]: {
      minHeight: "calc(100vh - 112px)"
    }
  },
  footerGrid: {
    margin: theme.spacing(1, 3, 3, 3)
  }
}));

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper: React.FC<Props> = ({ children }) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.root}>
      <AuthBackground />
      <Grid container direction="column" justifyContent="flex-end" className={classes.root}>
        <Grid item xs={12} className={classes.logoGrid}>
          <Logo />
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} container justifyContent="center" alignItems="center" className={classes.authCardGrid}>
            <Grid item>
              <AuthCard>{children}</AuthCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.footerGrid}>
          <AuthFooter />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthWrapper;
