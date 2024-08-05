import React, { useCallback, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

// material-ui
import { Box, Card, CardContent, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import MuiMarkdown from "mui-markdown";

// project imports
import SimpleBar from "@/components/third-party/SimpleBar";
import Avatar from "@/components/@extended/Avatar";
import { useTicketContext } from "../context";
import { Message } from "@/model/ticket";
import { makeStyles } from "@/themes/hooks";
import { useGetUserInfoQuery } from "@/store/services/api";

// assets
import { CopyOutlined } from "@ant-design/icons";

const useStyles = makeStyles()((theme) => ({
  root: {
    overflowX: "hidden"
  },
  rootBox: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(3)
  },
  userMessageCard: {
    display: "inline-block",
    float: "right",
    bgcolor: theme.palette.primary.main,
    boxShadow: "none"
  },
  serverMessageCard: {
    display: "inline-block",
    float: "left",
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.paper : theme.palette.grey[0],
    boxShadow: "none"
  },
  cardContent: {
    padding: theme.spacing(1.25),
    paddingBottom: `${theme.spacing(1.25)} !important`,
    width: "fit-content",
    marginLeft: "auto",
    "& > p": {
      marginBottom: 0
    }
  },
  textBlock: {
    "& > p": {
      color: theme.palette.primary.contrastText,
      marginBottom: 0
    }
  }
}));

const ChatHistory: React.FC = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const {
    ticketQuery: { data }
  } = useTicketContext();
  const { data: userInfo } = useGetUserInfoQuery();

  const wrapper = useRef(document.createElement("div"));
  const scrollToBottom = useCallback(() => {
    wrapper.current.scrollIntoView(false);
  }, [wrapper.current]);

  useEffect(() => {
    scrollToBottom();
  }, [data?.message.length, scrollToBottom]);

  const copyMessage = useCallback(
    (message: string) => () => {
      window.navigator.clipboard
        .writeText(message)
        .then(() => {
          enqueueSnackbar(t("notice::copy", { context: "success" }), {
            variant: "success"
          });
        })
        .catch((err) => {
          console.error("Failed to copy:", err);
          enqueueSnackbar(t("notice::copy", { context: "error" }), {
            variant: "error"
          });
        });
    },
    [enqueueSnackbar, t]
  );

  const UserMessage: React.FC<{ message: Message }> = ({ message }) => (
    <Stack direction="row" spacing={1.25}>
      <Grid container spacing={1} justifyContent="flex-end">
        <Grid item xs={2} md={3} xl={4} />
        <Grid item xs={10} md={9} xl={8}>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
            <IconButton size="small" onClick={copyMessage(message.message)}>
              <CopyOutlined />
            </IconButton>
            <Card className={classes.userMessageCard}>
              <CardContent className={classes.cardContent}>
                <MuiMarkdown>{message.message}</MuiMarkdown>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography align="right" variant="subtitle2" color="textSecondary">
            {dayjs.unix(message.created_at).format("YYYY/MM/DD HH:mm")}
          </Typography>
        </Grid>
      </Grid>
      <Avatar alt={userInfo?.email} src={userInfo?.avatar_url} />
    </Stack>
  );

  const ServerMessage: React.FC<{ message: Message }> = ({ message }) => (
    <Stack direction="row" spacing={1.25} alignItems="flex-start">
      <Avatar alt={"server"} color={"secondary"} />
      <Grid container>
        <Grid item xs={12} sm={7}>
          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
            <Card className={classes.serverMessageCard}>
              <CardContent className={classes.cardContent}>
                <MuiMarkdown>{message.message}</MuiMarkdown>
              </CardContent>
            </Card>
            <IconButton size="small" onClick={copyMessage(message.message)}>
              <CopyOutlined />
            </IconButton>
          </Stack>
        </Grid>
        <Grid item xs={12} sx={{ mt: 1 }}>
          <Typography align="left" variant="subtitle2" color="textSecondary">
            {dayjs.unix(message.created_at).format("YYYY/MM/DD HH:mm")}
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  );

  return (
    <SimpleBar className={classes.root}>
      <Box className={classes.rootBox}>
        <Stack spacing={2.5} ref={wrapper} direction={"column"}>
          {data?.message.map((message, index) =>
            message.is_me ? (
              <UserMessage message={message} key={index} />
            ) : (
              <ServerMessage message={message} key={index} />
            )
          )}
        </Stack>
      </Box>
    </SimpleBar>
  );
};

export default ChatHistory;
