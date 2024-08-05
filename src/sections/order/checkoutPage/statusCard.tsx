import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

// material-ui
import { Stack, Typography } from "@mui/material";

// project imports
import MainCard from "@/components/MainCard";
import { useCheckoutContext } from "./context";
import { OrderStatus } from "@/model/order";
import { makeStyles } from "@/themes/hooks";

// assets
import { CheckCircleFilled, InfoCircleFilled, WarningFilled } from "@ant-design/icons";

const useStyles = makeStyles<{
  status: OrderStatus;
}>()((theme, { status }) => ({
  root: {
    padding: theme.spacing(1)
  },
  icon: {
    fontSize: theme.spacing(8),
    color: theme.palette[status === OrderStatus.FINISHED ? "success" : "warning"].main
  }
}));

const StatusCard: React.FC = () => {
  const { t } = useTranslation();
  const { status } = useCheckoutContext();
  const { classes } = useStyles({ status });

  const icon = useMemo(() => {
    switch (status) {
      case OrderStatus.FINISHED:
        return <CheckCircleFilled className={classes.icon} />;
      case OrderStatus.CANCELLED:
        return <WarningFilled className={classes.icon} />;
      case OrderStatus.PENDING:
        return <InfoCircleFilled className={classes.icon} />;
      default:
        return null;
    }
  }, [status]);

  const context = useMemo(() => {
    switch (status) {
      case OrderStatus.FINISHED:
        return "finished";
      case OrderStatus.CANCELLED:
        return "cancelled";
      case OrderStatus.PAID:
        return "paid";
      default:
        return null;
    }
  }, [status]);

  return (
    <MainCard className={classes.root}>
      <Stack direction={"column"} spacing={3}>
        <Stack direction={"column"} spacing={1} alignItems={"center"}>
          {icon}
          <Typography variant={"h3"}>{t("order.checkout.status-card.status", { context })}</Typography>
          <Typography variant={"body1"} color={"textSecondary"} align={"center"}>
            {t("order.checkout.status-card.description", { context })}
          </Typography>
        </Stack>
      </Stack>
    </MainCard>
  );
};

export default StatusCard;
