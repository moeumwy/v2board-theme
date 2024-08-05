import React from "react";
import { useTranslation } from "react-i18next";

// material-ui
import { Box, Grid, Stack, Typography, Button } from "@mui/material";

// project imports
import MainCard from "@/components/MainCard";
import { useTicketContext } from "../context";
import TopBar from "./topBar";
import InputArea from "./inputArea";
import ChatHistory from "./chatHistory";
import { makeStyles } from "@/themes/hooks";
import { TicketStatus } from "@/model/ticket";
import CreateTicketTxt from "@/sections/ticket/detailPage/createTicketTxt";

const useStyles = makeStyles<{
  drawerOpen: boolean;
  drawerWidth: number;
}>()((theme, { drawerOpen, drawerWidth }) => ({
  root: {
    transition: theme.transitions.create("margin", {
      easing: drawerOpen ? theme.transitions.easing.easeOut : theme.transitions.easing.sharp,
      duration: drawerOpen ? theme.transitions.duration.shorter : theme.transitions.duration.shorter
    }),
    marginLeft: drawerOpen ? 0 : -drawerWidth,
    width: drawerOpen ? `calc(100% - ${drawerWidth}px)` : "100%",
    [theme.breakpoints.down("lg")]: {
      paddingLeft: 0,
      marginLeft: 0
    },
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    flexGrow: 1
  },
  mainCard: {
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.paper : theme.palette.grey[50],
    paddingTop: theme.spacing(2),
    borderRadius: theme.spacing(0, 0.5, 0.5, 0),
    borderLeft: "none",
    height: "100%"
  },
  centerBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    height: "100%"
  },
  createButton: {
    marginTop: theme.spacing(2),
  }
}));

const Main: React.FC = () => {
  const { t } = useTranslation();
  const {
    drawerOpen,
    drawerWidth,
    currentId,
    ticketQuery: { data }
  } = useTicketContext();

  const { classes } = useStyles({
    drawerOpen,
    drawerWidth
  });

  const handleCreateTicket = () => {
    // Implement functionality to create ticket here
  };

  return (
    <Box className={classes.root}>
      <Grid container flexGrow={1}>
        <Grid item xs={12}>
          <MainCard content={false} className={classes.mainCard}>
            <Stack spacing={3} direction={"column"} height={"100%"}>
              {currentId === 0 ? (
               <Box className={classes.centerBox}>
               <Typography variant="h5" style={{ marginBottom: '10px' }}>{t("ticket.conversation.none_selected")}</Typography>
               <Stack direction="row" alignItems="center" justifyContent="flex-end">
                 <CreateTicketTxt />
               </Stack>
             </Box>
             
              ) : (
                <>
                  <TopBar />
                  <Box flexGrow={1}>
                    <ChatHistory />
                  </Box>
                  {data?.status === TicketStatus.Open && <InputArea />}
                </>
              )}
            </Stack>
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Main;
