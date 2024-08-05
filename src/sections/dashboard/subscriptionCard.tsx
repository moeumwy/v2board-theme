import React, { useMemo } from "react";

// third-party
import dayjs from "dayjs";
import lo from "lodash-es";
import { Link } from "react-router-dom"; // 导入 Link 组件
import Button from "@mui/material/Button"; // 导入 Button 组件
import { Trans, useTranslation } from "react-i18next";

// material-ui
import { Box, LinearProgress, Skeleton, Stack, Typography } from "@mui/material";

// project imports
import MainCard from "@/components/MainCard";
import { useGetUserSubscriptionQuery } from "@/store/services/api";

const SubscriptionCard: React.FC = () => {
  const { data: subscriptionInfo, isLoading } = useGetUserSubscriptionQuery();
  const { t } = useTranslation();

  const trafficUsed = useMemo(
    () => (subscriptionInfo ? (subscriptionInfo?.u + subscriptionInfo?.d) / subscriptionInfo?.transfer_enable : 1),
    [subscriptionInfo]
  );

  return (
    <MainCard title={<Trans i18nKey={"dashboard.subscription-card.title"}>My Subscription</Trans>}>
      {subscriptionInfo && subscriptionInfo.plan_id !== null && (
        <Stack spacing={2}>
          <Typography component={"h6"} variant={"h4"}>
            {subscriptionInfo.plan!.name}
          </Typography>
          <Typography variant={"body1"}>
            {t("dashboard.subscription-card.expire", {
              context: subscriptionInfo.expired_at === null ? "forever" : "limited",
              date: dayjs.unix(subscriptionInfo.expired_at || 0).format("YYYY/MM/DD"),
              reset_date: subscriptionInfo.reset_day,
              count:
                subscriptionInfo.expired_at !== null
                  ? Math.max(dayjs.unix(subscriptionInfo.expired_at!).diff(dayjs(), "day"), 0)
                  : undefined
            })}
          </Typography>
          <LinearProgress variant={"determinate"} value={trafficUsed * 100} />
          <Typography variant={"body1"}>
            {t("dashboard.subscription-card.traffic", {
              used: lo.round((subscriptionInfo.u + subscriptionInfo.d) / 1073741824, 2),
              total: lo.round(subscriptionInfo.transfer_enable / 1073741824, 2)
            })}
          </Typography>
        </Stack>
      )}
      {subscriptionInfo && subscriptionInfo.plan_id === null && (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} minHeight={160}>
        <Typography variant={"body1"}>{t("dashboard.subscription-card.no-subscription")}</Typography>
        <Box marginTop={2}>
          <Button variant="contained" color="primary" component={Link} to="/plan/buy">
            {t("dashboard.shortcut.subscribe.buy-button")}
          </Button>
        </Box>
      </Box>
      
      )}
      {isLoading && (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} minHeight={160}>
          <Skeleton variant={"rectangular"} width={"100%"} height={120} />
        </Box>
      )}
    </MainCard>
  );
};

export default SubscriptionCard;
