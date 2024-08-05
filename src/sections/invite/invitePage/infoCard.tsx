import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

// material-ui
import { Skeleton, Stack, Typography } from "@mui/material";

// project imports
import MainCard from "@/components/MainCard";
import { useGetInviteDataQuery } from "@/store/services/api";
import { makeStyles } from "@/themes/hooks";

const useStyles = makeStyles()((theme) => ({
  root: {
    height: theme.spacing(30),
    display: "flex",
    flexDirection: "column",
    "& .MuiCardContent-root": {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }
}));

const InfoCard: React.FC = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetInviteDataQuery();

  const tableData = useMemo(
    () => [
      {
        label: t("invite.my-invite.info-card.user-register-count"),
        value: t("invite.my-invite.info-card.user-register-count-value", {
          count: data?.stat[0] ?? 0
        })
      },
      {
        label: t("invite.my-invite.info-card.commission-rate"),
        value: t("invite.my-invite.info-card.commission-rate-value", {
          rate: data?.stat[3] ?? 0
        })
      },
      {
        label: t("invite.my-invite.info-card.commission-confirming"),
        value: t("invite.my-invite.info-card.commission-confirming-value", {
          count: (data?.stat[2] ?? 0) / 100
        })
      },
      {
        label: t("invite.my-invite.info-card.commission-total"),
        value: t("invite.my-invite.info-card.commission-total-value", {
          count: (data?.stat[1] ?? 0) / 100
        })
      }
    ],
    [data, t]
  );

  const { classes } = useStyles();

  return (
    <MainCard title={t("invite.my-invite.info-card.title")} className={classes.root}>
      <Stack spacing={2}>
        {tableData.map((item, index) =>
          isLoading ? (
            <Skeleton key={index} variant="text" width="100%" />
          ) : (
            <Stack direction="row" justifyContent="space-between" key={index}>
              <Typography variant={"body1"}>{item.label}</Typography>
              <Typography variant={"body1"}>{item.value}</Typography>
            </Stack>
          )
        )}
      </Stack>
    </MainCard>
  );
};

export default InfoCard;
