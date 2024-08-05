import React from "react";
import { useTranslation } from "react-i18next";

// material-ui
import { Grid, IconButton, Skeleton, Stack, Typography } from "@mui/material";

// project imports
import { TicketLevelMap, TicketStatus } from "@/model/ticket";
import { useTicketContext } from "../../context";
import { makeStyles } from "@/themes/hooks";
import CloseButton from "./closeButton";

// assets
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const useStyles = makeStyles()((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}));

const TopBar: React.FC = () => {
  const { t } = useTranslation();
  const {
    drawerOpen,
    drawerActions: { toggle: toggleDrawer },
    currentId,
    ticketQuery: { data, isFetching }
  } = useTicketContext();

  const { classes } = useStyles();

  return (
    <Grid container justifyContent="space-between" className={classes.root}>
      <Grid item>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={() => toggleDrawer()} color="secondary" size="large">
            {drawerOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </IconButton>
          <Stack>
            <Typography variant="subtitle1">
              {data && !isFetching ? (
                t("ticket.header.title", {
                  id: data.id,
                  subject: data.subject
                })
              ) : (
                <Skeleton variant={"text"} width={200} />
              )}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {data && !isFetching ? (
                t("ticket.header.ticket_level", {
                  context: TicketLevelMap[data.level]
                })
              ) : (
                <Skeleton variant={"text"} width={80} />
              )}
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item>
        <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
          {data?.status === TicketStatus.Open && <CloseButton />}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default TopBar;
