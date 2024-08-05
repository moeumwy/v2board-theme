import React from "react";

// material-ui
import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress";
import { Box } from "@mui/material";

// project import
import { makeStyles } from "@/themes/hooks";

const useStyles = makeStyles()((theme) => ({
  wrapper: {
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

// ==============================|| Loader ||============================== //

export interface LoaderProps extends LinearProgressProps {}

const Loader: React.FC<LoaderProps> = (props) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.wrapper}>
      <LinearProgress color="primary" {...props} />
    </Box>
  );
};

export default Loader;
