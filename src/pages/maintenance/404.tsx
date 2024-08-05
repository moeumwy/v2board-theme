import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// material-ui
import { Box, Button, Grid, Stack, Typography } from "@mui/material";

// project import
import config from "@/config";
import useTitle from "@/hooks/useTitle";

// assets
import error404 from "@/assets/images/maintenance/Error404.png";
import TwoCone from "@/assets/images/maintenance/TwoCone.png";
import { makeStyles } from "@/themes/hooks";

const useStyles = makeStyles()((theme) => ({
  container: {
    minHeight: "100vh",
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1),
    overflow: "hidden"
  },
  box404Image: {
    width: 250,
    height: 130,
    [theme.breakpoints.up("sm")]: {
      width: 590,
      height: 300
    }
  },
  image404: { width: "100%", height: "100%" },
  coneGrid: { position: "relative" },
  coneBox: {
    position: "absolute",
    top: 60,
    left: -40,
    width: 130,
    height: 115,
    [theme.breakpoints.up("sm")]: {
      width: 390,
      height: 330
    }
  },
  cone: { width: "100%", height: "100%" }
}));

// ==============================|| ERROR 404 - MAIN ||============================== //

const Error404: React.FC = () => {
  const { t } = useTranslation();
  useTitle("not_found");

  const { classes } = useStyles();

  return (
    <>
      <Grid
        container
        spacing={10}
        direction="column"
        alignItems="center"
        justifyContent="center"
        className={classes.container}
      >
        <Grid item xs={12}>
          <Stack direction="row">
            <Grid item>
              <Box className={classes.box404Image}>
                <Box component={"img"} src={error404} alt="404" className={classes.image404} />
              </Box>
            </Grid>
            <Grid item className={classes.coneGrid}>
              <Box className={classes.coneBox}>
                <Box component={"img"} src={TwoCone} alt="cone" className={classes.cone} />
              </Box>
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <Typography variant="h1">{t("maintenance.404.title")}</Typography>
            <Typography color="textSecondary" align="center" noWrap>
              {t("maintenance.404.description")}
            </Typography>
            <Button component={Link} to={config.defaultPath} variant="contained">
              {t("maintenance.404.button")}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Error404;
