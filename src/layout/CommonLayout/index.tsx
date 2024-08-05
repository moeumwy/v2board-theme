import React, { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

// material-ui
import { Box } from "@mui/material";
import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress";

// project import
import Loadable from "@/components/Loadable";
import { makeStyles } from "@/themes/hooks";

const Header = lazy(() => import("./Header"));
const FooterBlock = Loadable(lazy(() => import("./FooterBlock")));

// ==============================|| Loader ||============================== //

const useStyles = makeStyles()((theme) => ({
  loaderWrapper: {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 2001,
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

export interface LoaderProps extends LinearProgressProps {}

const Loader: React.FC<LoaderProps> = (props) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.loaderWrapper}>
      <LinearProgress color="primary" {...props} />
    </Box>
  );
};

// ==============================|| MINIMAL LAYOUT ||============================== //

export interface CommonLayoutProps {
  layout?: string;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ layout = "blank" }) => (
  <>
    {/*{(layout === "landing" || layout === "simple") && (*/}
    {/*  <Suspense fallback={<Loader />}>*/}
    {/*    <Header layout={layout} />*/}
    {/*    <Outlet />*/}
    {/*    <FooterBlock isFull={layout === "landing"} />*/}
    {/*  </Suspense>*/}
    {/*)}*/}
    {layout === "blank" && <Outlet />}
  </>
);

export default CommonLayout;
