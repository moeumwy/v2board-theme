import React from "react";
import { useTranslation } from "react-i18next";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Chip,
  Drawer,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery
} from "@mui/material";

// project imports
import UserList from "./userList";
import MainCard from "@/components/MainCard";
import SimpleBar from "@/components/third-party/SimpleBar";
import { useTicketContext } from "./context";
import { makeStyles } from "@/themes/hooks";
import { TicketStatus } from "@/model/ticket";

// assets
import { SearchOutlined } from "@ant-design/icons";
import CreateTicketButton from "@/sections/ticket/detailPage/createTicketButton";

// ==============================|| CHAT DRAWER ||============================== //

const useStyles = makeStyles<{ drawerWidth: number }>()((theme, { drawerWidth }) => ({
  drawer: {
    width: drawerWidth,
    zIndex: theme.zIndex.drawer,
    [theme.breakpoints.up("lg")]: {
      zIndex: 0
    },
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    flexGrow: 1
  },
  drawerPaper: {
    width: drawerWidth,
    boxSizing: "border-box",
    position: "relative",
    border: "none"
  },
  mainCard: {
    [theme.breakpoints.down("lg")]: {
      backgroundColor: "transparent"
    },
    borderRadius: theme.spacing(0.5, 0, 0, 0.5),
    borderRight: "none"
  },
  mainCardContainer: {
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(1)
  },
  titleChip: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    "& .MuiChip-label": {
      padding: theme.spacing(0.5, 0)
    }
  },
  searchInput: {
    padding: theme.spacing(1.3125, 0, 1.5),
    color: theme.palette.text.primary
  }
}));

const ChatDrawer: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const {
    drawerWidth,
    drawerOpen,
    drawerActions: { set: setDrawer },
    search,
    setSearch,
    ticketsQuery: { data: tickets }
  } = useTicketContext();

  const matchDownLG = useMediaQuery(theme.breakpoints.down("lg"));

  const { classes } = useStyles({ drawerWidth });

  return (
    <Drawer
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper
      }}
      variant={matchDownLG ? "temporary" : "persistent"}
      anchor="left"
      open={drawerOpen}
      ModalProps={{ keepMounted: true }}
      onClose={() => setDrawer(false)}
    >
      {drawerOpen && (
        <MainCard className={classes.mainCard} border={!matchDownLG} content={false}>
          <Box className={classes.mainCardContainer}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center" justifyContent={"space-between"}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h5" color="inherit">
                    {t("ticket.drawer.title")}
                  </Typography>
                  <Chip
                    label={tickets?.filter((ticket) => ticket.status === TicketStatus.Open).length ?? 0}
                    component="span"
                    color="secondary"
                    className={classes.titleChip}
                  />
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="flex-end">
                  <CreateTicketButton />
                </Stack>
              </Stack>

              <OutlinedInput
                fullWidth
                id="input-search-header"
                placeholder={t("ticket.drawer.search", { context: "placeholder" }).toString()}
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
                sx={{
                  "& .MuiOutlinedInput-input": {
                    p: "10.5px 0px 12px",
                    color: "darkgray"
                  }
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchOutlined style={{ fontSize: "small" }} />
                  </InputAdornment>
                }
              />
            </Stack>
          </Box>

          <SimpleBar
            sx={{
              overflowX: "hidden",
              height: matchDownLG ? "calc(100vh - 120px)" : "calc(100vh - 428px)",
              minHeight: matchDownLG ? 0 : 420
            }}
          >
            <Box sx={{ p: 3, pt: 0 }}>
              <UserList />
            </Box>
          </SimpleBar>
        </MainCard>
      )}
    </Drawer>
  );
};

export default ChatDrawer;
