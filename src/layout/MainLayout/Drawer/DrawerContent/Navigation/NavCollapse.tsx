import React, { useEffect, useState } from "react";

// third-party
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Collapse,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography
} from "@mui/material";

// project import
import NavItem from "./NavItem";
import Transitions from "@/components/@extended/Transitions";
import { makeStyles } from "@/themes/hooks";

// assets
import { BorderOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";

// types
import { NavItemType } from "@/types/menu";
import { RootStateProps } from "@/types/root";

type VirtualElement = {
  getBoundingClientRect: () => DOMRect;
  contextElement?: Element;
};

const useStyles = makeStyles<{
  drawerOpen: boolean;
  level: number;
}>()((theme, { drawerOpen, level }) => ({
  popper: {
    overflow: "visible",
    zIndex: 2001,
    minWidth: 180,
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 38,
      left: -5,
      width: 10,
      height: 10,
      backgroundColor: theme.palette.background.paper,
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 120,
      borderLeft: `1px solid ${theme.palette.grey.A800}`,
      borderBottom: `1px solid ${theme.palette.grey.A800}`
    }
  },
  borderIcon: {
    fontSize: "1rem"
  },
  icon: {
    fontSize: drawerOpen ? "1rem" : "1.25rem"
  },
  listItemButton: {
    paddingLeft: drawerOpen ? theme.spacing(level * 3.5) : theme.spacing(1.5),
    paddingTop: !drawerOpen && level === 1 ? theme.spacing(1.25) : theme.spacing(1),
    paddingBottom: !drawerOpen && level === 1 ? theme.spacing(1.25) : theme.spacing(1),
    "&:hover": {
      backgroundColor: drawerOpen
        ? theme.palette.mode === "dark"
          ? theme.palette.divider
          : theme.palette.primary.lighter
        : "transparent"
    },
    "&.Mui-selected": {
      backgroundColor: "transparent",
      color: theme.palette.mode === "dark" && drawerOpen ? theme.palette.text.primary : theme.palette.primary.main,
      "&:hover": {
        color: theme.palette.mode === "dark" && drawerOpen ? theme.palette.text.primary : theme.palette.primary.main,
        backgroundColor: drawerOpen && theme.palette.mode === "dark" ? theme.palette.divider : "transparent"
      }
    }
  },
  listItemIcon: {
    minWidth: 28,
    ...(!drawerOpen && {
      borderRadius: 1.5,
      width: 36,
      height: 36,
      alignItems: "center",
      justifyContent: "center",
      "&:hover": {
        bgcolor: theme.palette.mode === "dark" ? theme.palette.secondary.light : theme.palette.secondary.lighter
      }
    })
  },
  upIcon: { fontSize: "0.625rem", marginLeft: 1, color: theme.palette.primary.main },
  downIcon: { fontSize: "0.625rem", marginLeft: 1 },
  paper: {
    overflow: "hidden",
    marginTop: theme.spacing(1.5),
    boxShadow: theme.customShadows.z1,
    backgroundImage: "none",
    border: `1px solid ${theme.palette.divider}`
  }
}));

// ==============================|| NAVIGATION - LIST COLLAPSE ||============================== //

interface Props {
  menu: NavItemType;
  level: number;
}

const NavCollapse = ({ menu, level }: Props) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const menuState = useSelector((state: RootStateProps) => state.menu);
  const { drawerOpen } = menuState;

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null | undefined>(null);

  const [anchorEl, setAnchorEl] = useState<VirtualElement | (() => VirtualElement) | null | undefined>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement, MouseEvent> | undefined
  ) => {
    setAnchorEl(null);
    if (drawerOpen) {
      setOpen(!open);
      setSelected(!selected ? menu.id : null);
    } else {
      setAnchorEl(event?.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { pathname } = useLocation();

  useEffect(() => {
    const childrens = menu.children ? menu.children : [];
    childrens.forEach((item) => {
      if (pathname && pathname.includes("product-details")) {
        if (item.url && item.url.includes("product-details")) {
          setOpen(true);
        }
      }

      if (item.url === pathname) {
        setOpen(true);
        setSelected(menu.id);
      }
    });
  }, [pathname, menu]);

  const { classes, cx, css } = useStyles({
    drawerOpen,
    level
  });

  const openMini = Boolean(anchorEl);

  const navCollapse = menu.children?.map((item) => {
    switch (item.type) {
      case "collapse":
        return <NavCollapse key={item.id} menu={item} level={level + 1} />;
      case "item":
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Collapse or Item
          </Typography>
        );
    }
  });

  const borderIcon = level === 1 ? <BorderOutlined className={classes.borderIcon} /> : false;
  const Icon = menu.icon!;
  const menuIcon = menu.icon ? <Icon className={classes.icon} /> : borderIcon;
  const textColor = theme.palette.mode === "dark" ? "grey.400" : "text.primary";

  return (
    <>
      <ListItemButton
        disableRipple
        selected={selected === menu.id}
        {...(!drawerOpen && { onMouseEnter: handleClick, onMouseLeave: handleClose })}
        onClick={handleClick}
        className={classes.listItemButton}
      >
        {menuIcon && (
          <ListItemIcon
            className={cx(
              classes.listItemIcon,
              css({
                color: selected === menu.id ? theme.palette.primary.main : textColor,
                ...(!drawerOpen &&
                  selected === menu.id && {
                    bgcolor: theme.palette.mode === "dark" ? theme.palette.primary[900] : theme.palette.primary.lighter,
                    "&:hover": {
                      bgcolor:
                        theme.palette.mode === "dark" ? theme.palette.primary.darker : theme.palette.primary.lighter
                    }
                  })
              })
            )}
          >
            {menuIcon}
          </ListItemIcon>
        )}
        {(drawerOpen || (!drawerOpen && level !== 1)) && (
          <ListItemText
            primary={
              <Typography variant="h6" color={selected === menu.id ? "primary" : textColor}>
                {t(menu.title ?? "undefined", { ns: "title" })}
              </Typography>
            }
            secondary={
              menu.caption && (
                <Typography variant="caption" color="secondary">
                  {menu.caption}
                </Typography>
              )
            }
          />
        )}
        {(drawerOpen || (!drawerOpen && level !== 1)) &&
          (openMini || open ? (
            <UpOutlined className={classes.upIcon} />
          ) : (
            <DownOutlined className={classes.downIcon} />
          ))}

        {!drawerOpen && (
          <Popper
            className={classes.popper}
            open={openMini}
            anchorEl={anchorEl}
            placement="right-start"
            popperOptions={{
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [-12, 1]
                  }
                }
              ]
            }}
          >
            {({ TransitionProps }) => (
              <Transitions in={openMini} {...TransitionProps}>
                <Paper className={classes.paper}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <Box>{navCollapse}</Box>
                  </ClickAwayListener>
                </Paper>
              </Transitions>
            )}
          </Popper>
        )}
      </ListItemButton>
      {drawerOpen && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List sx={{ p: 0 }}>{navCollapse}</List>
        </Collapse>
      )}
    </>
  );
};

export default NavCollapse;
