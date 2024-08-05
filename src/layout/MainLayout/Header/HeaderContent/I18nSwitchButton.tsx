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
import { Trans, useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";

// project import
import { makeStyles } from "@/themes/hooks";
import IconButton from "@/components/@extended/IconButton";
import Transitions from "@/components/@extended/Transitions";
import MainCard from "@/components/MainCard";

// assets
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import "flag-icons/css/flag-icons.css";
import config from "@/config";

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
    fontSize: "1rem",
    borderRadius: theme.shape.borderRadius
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
const I18nSwitchButton: React.FC = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down("md"));
  const { t, i18n } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const handleChangeLanguage = (lang: string) => () => {
    if (i18n.language === lang) {
      return;
    }

    i18n
      .changeLanguage(lang)
      .then(() => {
        enqueueSnackbar(
          t("notice::language-change", {
            context: "success",
            lng: lang
          }),
          {
            variant: "success"
          }
        );
      })
      .catch((err) => {
        console.error("change language error", err);
        enqueueSnackbar(
          t("notice::language-change", {
            context: "error",
            lng: lang
          }),
          {
            variant: "error"
          }
        );
      });
  };

  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, { toggle: toggleOpen, set: setOpen }] = useToggle(false);
  const handleClose = () => {
    setOpen(false);
  };

  const { classes, cx } = useStyles({ open });

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
        <LanguageOutlinedIcon
          sx={{
            fontSize: "1rem"
          }}
        />
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
                  title={<Trans i18nKey={"layout.header.i18n-switch.title"}>Language</Trans>}
                  elevation={0}
                  border={false}
                  content={false}
                >
                  <List component="nav" className={classes.nav}>
                    {config.languages
                      .filter((lang) => i18n.hasResourceBundle(lang, "common"))
                      .map((lang) => (
                        <ListItem disablePadding divider key={lang}>
                          <ListItemButton
                            aria-label={lang}
                            selected={i18n.language === lang}
                            onClick={() => {
                              handleChangeLanguage(lang)();
                              handleClose(); // 添加此行
                            }}
                          >
                            <Stack direction={"row"} spacing={2} alignItems={"center"}>
                              <Box
                                className={cx(classes.icon, "fi", `fi-${lang.split("-")[1].toLowerCase()}`)}
                                component={"span"}
                              />
                              <Typography variant="h6" className={classes.listItemTextTypography} noWrap>
                                {t(`language::${lang}`, { context: "name" })}
                              </Typography>
                            </Stack>
                          </ListItemButton>
                        </ListItem>
                      ))}
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

export default I18nSwitchButton;
