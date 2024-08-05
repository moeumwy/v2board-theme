import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Divider,
  Paper,
  Popper,
  Stack,
  Typography,
  useMediaQuery
} from "@mui/material";

// project import
import Avatar from "@/components/@extended/Avatar";
import MainCard from "@/components/MainCard";
import Transitions from "@/components/@extended/Transitions";
import MenuList from "./MenuList";
import { useGetUserInfoQuery } from "@/store/services/api";
import { makeStyles } from "@/themes/hooks";

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const useStyles = makeStyles<{ open: boolean }>({
  name: "profile"
})((theme, { open }) => ({
  root: { flexShrink: 0 },
  button: {
    padding: theme.spacing(0.25),
    backgroundColor: open ? theme.palette.grey[300] : "transparent",
    ["@media (prefers-color-scheme: dark)"]: {
      backgroundColor: open ? theme.palette.grey[200] : "transparent"
    },
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      backgroundColor: theme.palette.mode === "dark" ? theme.palette.secondary.light : theme.palette.secondary.lighter
    },
    "&:focus-visible": {
      outline: `2px solid ${theme.palette.secondary.dark}`,
      outlineOffset: 2
    }
  },
  userInfo: {
    alignItems: "center",
    padding: theme.spacing(0.5)
  },
  paper: {
    boxShadow: theme.customShadows.z1,
    width: 280,
    minWidth: 240,
    maxWidth: 280,
    [theme.breakpoints.down("md")]: {
      maxWidth: 250
    }
  },
  cardContent: {
    padding: theme.spacing(1.5, 2, 2)
  },
  userAvatar: { width: theme.spacing(4), height: theme.spacing(4) },
  avatarStack: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "nowrap"
  },
  infoStack: {
    maxWidth: `calc(100% - ${theme.spacing(5)})`
  }
}));

const Profile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();

  const { data: user } = useGetUserInfoQuery();

  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const { classes } = useStyles({
    open
  });

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Box className={classes.root}>
      <ButtonBase
        className={classes.button}
        ref={anchorRef}
        aria-label="open profile"
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} className={classes.userInfo}>
          <Avatar alt="profile user" src={user?.avatar_url} size="xs" />
          {isMobile || <Typography variant="subtitle1">{user?.email}</Typography>}
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
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
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard elevation={0} border={false} content={false}>
                  <CardContent className={classes.cardContent}>
                    <Stack direction={"row"} className={classes.avatarStack} spacing={1}>
                      <Avatar alt="profile user" src={user?.avatar_url} className={classes.userAvatar} />
                      <Stack className={classes.infoStack}>
                        <Typography variant="h6" noWrap>
                          {user?.email}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {t("layout.header.profile.user_secondary")}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                  <Divider />
                  {open && <MenuList />}
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;
