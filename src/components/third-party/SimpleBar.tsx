import React from "react";

// material-ui
import { alpha, Theme } from "@mui/material/styles";
import { Box } from "@mui/material";

// third-party
import SimpleBar, { Props } from "simplebar-react";
import { BrowserView, MobileView } from "react-device-detect";
import { MUIStyledCommonProps } from "@mui/system";
import { makeStyles } from "@/themes/hooks";

const useStyles = makeStyles()((theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
    overflow: "hidden"
  },
  simpleBar: {
    maxHeight: "100%",
    "& .simplebar-scrollbar": {
      "&:before": {
        backgroundColor: alpha(theme.palette.grey[500], 0.48)
      },
      "&.simplebar-visible:before": {
        opacity: 1
      }
    },
    "& .simplebar-track.simplebar-vertical": {
      width: 10
    },
    "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": {
      height: 6
    },
    "& .simplebar-mask": {
      zIndex: "inherit"
    }
  }
}));

// ==============================|| SIMPLE SCROLL BAR  ||============================== //

type SimpleScrollBarProps = MUIStyledCommonProps<Theme> & Props & { children?: React.ReactNode; className?: string };

const SimpleBarScroll: React.FC<SimpleScrollBarProps> = ({ sx, children, className, ...other }) => {
  const { classes, cx } = useStyles();

  return (
    <>
      <Box component={BrowserView} className={classes.root}>
        <Box component={SimpleBar} className={cx(classes.simpleBar, className)} clickOnTrack={false} sx={sx} {...other}>
          {children}
        </Box>
      </Box>
      <MobileView>
        <Box sx={{ overflowX: "auto", ...sx }} {...other}>
          {children}
        </Box>
      </MobileView>
    </>
  );
};

export default SimpleBarScroll;
