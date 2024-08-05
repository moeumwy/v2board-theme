import React, { useRef } from "react";
import { useToggle } from "ahooks";

// material-ui
import {
  Box,
  ClickAwayListener,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Popper,
  Stack,
  Typography,
  useMediaQuery
} from "@mui/material";
import { Trans } from "react-i18next";
import { useTheme } from "@mui/material/styles";

// project import
import { makeStyles } from "@/themes/hooks";
import IconButton from "@/components/@extended/IconButton";
import Transitions from "@/components/@extended/Transitions";
import MainCard from "@/components/MainCard";
import { useDispatch, useSelector } from "@/store";
import { setThemeMode } from "@/store/reducers/view";

// assets
import BrightnessMediumOutlinedIcon from "@mui/icons-material/BrightnessMediumOutlined";
import Brightness5OutlinedIcon from "@mui/icons-material/Brightness5Outlined";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import Brightness6OutlinedIcon from "@mui/icons-material/Brightness6Outlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const useStyles = makeStyles<{ open: boolean }>()((theme, { open }) => ({
  root: { flexShrink: 0 },
  iconButton: {
    color: theme.palette.text.primary,
    ...(theme.palette.mode === "dark"
      ? {
          backgroundColor: open ? theme.palette.grey[300] : theme.palette.background.default
        }
      : {
          backgroundColor: open ? theme.palette.grey[300] : theme.palette.grey[100]
        }),
    "& .MuiSvgIcon-root": {
      fontSize: "1rem"
    }
  },
  paper: {
    boxShadow: theme.customShadows.z1,
    width: "100%",
    minWidth: 160,
    maxWidth: 320,
    [theme.breakpoints.down("md")]: {
      maxWidth: 280
    }
  },
  nav: {
    padding: 0
  },
  icon: {
    color: theme.palette.text.primary,
    fontSize: "1rem"
  },
  listItemTextTypography: {
    color: theme.palette.text.primary
  },
  viewAllButton: {
    textAlign: "center",
    paddingTop: `${theme.spacing(1.5)} !important`,
    paddingBottom: `${theme.spacing(1.5)} !important`
  },
  listItemText: {
    margin: theme.spacing(0.75, 0.75)
  },
  itemAvatar: {
    marginRight: theme.spacing(1)
  }
}));
const DarkModeSwitchButton: React.FC = () => {
  const theme = useTheme();
  const themeMode = useSelector((state) => state.view.theme.mode);
  const matchesXs = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, { toggle: toggleOpen, set: setOpen }] = useToggle(false);
  const handleClose = () => {
    setOpen(false);
  };

  const { classes } = useStyles({ open });

  return (
    <Box className={classes.root}>
      <IconButton
        color="secondary"
        className={classes.iconButton}
        variant="light"
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={toggleOpen}
      >
        <BrightnessMediumOutlinedIcon />
      </IconButton>
      <Popper
        placement={matchesXs ? "bottom" : "bottom-end"}
        open={open}
        anchorEl={anchorRef.current}
        role={"menu"}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [matchesXs ? -5 : 0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  title={<Trans i18nKey={"layout.header.dark-mode-switch.title"}>Mode Switch</Trans>}
                  elevation={0}
                  border={false}
                  content={false}
                >
                  <List component="nav" className={classes.nav}>
                    <ListItem disablePadding divider>
                      <ListItemButton
                        onClick={() => {
                          dispatch(setThemeMode("system"));
                          handleClose(); // 添加此行
                        }}
                        selected={themeMode === "system"}
                      >
                        <Stack direction={"row"} spacing={2} alignItems={"center"}>
                          <Brightness6OutlinedIcon className={classes.icon} />
                          <Typography variant="h6" className={classes.listItemTextTypography} noWrap>
                            <Trans i18nKey={"layout.header.dark-mode-switch.follow-system"}>跟随系统</Trans>
                          </Typography>
                        </Stack>
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding divider>
                      <ListItemButton
                        onClick={() => {
                          dispatch(setThemeMode("time"));
                          handleClose(); // 添加此行
                        }}
                        selected={themeMode === "time"}
                      >
                        <Stack direction={"row"} spacing={2} alignItems={"center"}>
                          <AccessTimeOutlinedIcon className={classes.icon} />
                          <Typography variant="h6" className={classes.listItemTextTypography} noWrap>
                            <Trans i18nKey={"layout.header.dark-mode-switch.follow-times"}>跟随时间</Trans>
                          </Typography>
                        </Stack>
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding divider>
                      <ListItemButton
                        onClick={() => {
                          dispatch(setThemeMode("light"));
                          handleClose(); // 添加此行
                        }}
                        selected={themeMode === "light"}
                      >
                        <Stack direction={"row"} spacing={2} alignItems={"center"}>
                          <Brightness5OutlinedIcon className={classes.icon} />
                          <Typography variant="h6" className={classes.listItemTextTypography} noWrap>
                            <Trans i18nKey={"layout.header.dark-mode-switch.always-light"}>始终浅色</Trans>
                          </Typography>
                        </Stack>
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding divider>
                      <ListItemButton
                        onClick={() => {
                          dispatch(setThemeMode("dark"));
                          handleClose(); // 添加此行
                        }}
                        selected={themeMode === "dark"}
                      >
                        <Stack direction={"row"} spacing={2} alignItems={"center"}>
                          <Brightness4OutlinedIcon className={classes.icon} />
                          <Typography variant="h6" className={classes.listItemTextTypography} noWrap>
                            <Trans i18nKey={"layout.header.dark-mode-switch.always-dark"}>始终暗色</Trans>
                          </Typography>
                        </Stack>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default DarkModeSwitchButton;
