import React, { useCallback } from "react";

// third-party
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";

// project imports
import Dot from "@/components/@extended/Dot";
import { useTicketContext } from "./context";
import { TicketLevel, TicketReplyStatus, TicketStatus } from "@/model/ticket";
import { makeStyles } from "@/themes/hooks";

// assets
import { CheckOutlined, CommentOutlined, MessageOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles()((theme) => ({
  listItemButton: {
    paddingLeft: theme.spacing(1)
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  iconAvatar: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    fontSize: "1rem"
  }
}));

const UserList = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { tickets, currentId, setCurrentId } = useTicketContext();
  const { classes, css, cx } = useStyles();
  const navigate = useNavigate();

  const getDateDiff = useCallback(
    (unix: number, key: string) => {
      const diffSec = dayjs().diff(dayjs.unix(unix), "second");
      switch (true) {
        case diffSec < 60:
          return t(key, {
            context: "just_now"
          });
        case diffSec < 3600:
          return t(key, {
            context: "minute",
            count: dayjs().diff(dayjs.unix(unix), "minute")
          });
        case diffSec < 86400:
          return t(key, {
            context: "hour",
            count: dayjs().diff(dayjs.unix(unix), "hour")
          });
        case diffSec < 2592000:
          return t(key, {
            context: "day",
            count: dayjs().diff(dayjs.unix(unix), "day")
          });
        case diffSec < 31536000:
          return t(key, {
            context: "month",
            count: dayjs().diff(dayjs.unix(unix), "month")
          });
        default:
          return t(key, {
            context: "year",
            count: dayjs().diff(dayjs.unix(unix), "year")
          });
      }
    },
    [t]
  );

  const getColorClass = useCallback(
    (level: TicketLevel) => {
      switch (level) {
        case TicketLevel.Low:
        default:
          return css({
            color: theme.palette.success.main,
            backgroundColor: theme.palette.success.lighter
          });
        case TicketLevel.Medium:
          return css({
            color: theme.palette.warning.main,
            backgroundColor: theme.palette.warning.lighter
          });
        case TicketLevel.High:
          return css({
            color: theme.palette.error.main,
            backgroundColor: theme.palette.error.lighter
          });
      }
    },
    [theme.palette, css]
  );

  return (
    <List component="nav">
      {tickets.map((ticket) => (
        <ListItem key={ticket.id} disablePadding divider>
          <ListItemButton
            className={classes.listItemButton}
            selected={ticket.id === currentId}
            onClick={() => {
              setCurrentId(ticket.id);
              navigate(`/ticket/${ticket.id}`);
            }}
          >
            <ListItemAvatar>
              <Avatar className={cx(getColorClass(ticket.level), classes.iconAvatar)}>
                {ticket.reply_status === TicketReplyStatus.Replied ? <MessageOutlined /> : <CommentOutlined />}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Stack component="span" direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                  <Typography variant="h5" color="inherit" className={classes.text}>
                    {ticket.subject}
                  </Typography>
                  <Typography component="span" color="textSecondary" variant="caption">
                    {/* TODO: last message */}
                    {t("ticket.drawer.reply_status", {
                      context:
                        ticket.status === TicketStatus.Closed
                          ? "closed"
                          : ticket.reply_status === TicketReplyStatus.Replied
                          ? "replied"
                          : "pending"
                    })}
                  </Typography>
                </Stack>
              }
              secondary={
                <Stack component="span" direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                  <Typography variant="caption" color="textSecondary" className={classes.text}>
                    {getDateDiff(ticket.updated_at, "ticket.drawer.updated_at")}
                  </Typography>
                  {ticket.status === TicketStatus.Open ? (
                    <Dot color="primary" />
                  ) : (
                    <CheckOutlined style={{ color: theme.palette.primary.main }} />
                  )}
                </Stack>
              }
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;
