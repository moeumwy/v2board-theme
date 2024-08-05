import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

// material-ui
import { List, ListItem, ListItemButton, Stack, Typography } from "@mui/material";

// project imports
import MainCard from "@/components/MainCard";
import { usePlanDetailContext } from "@/sections/subscription/planDetailsPage/context";
import { getMode } from "@/utils/plan";
import { PaymentPeriod } from "@/types/plan";

const PeriodSelectCard: React.FC = () => {
  const { t } = useTranslation();
  const {
    planQuery: { data },
    setPeriod,
    period: periodState,
    isSubmitting
  } = usePlanDetailContext();
  const periods = useMemo(() => (data ? Object.keys(getMode(data)) : []), [data]);

  return (
    <MainCard title={t("subscription.plan.period-select-card.title")} content={false}>
      <List sx={{ p: 0 }}>
        {data &&
          periods.map((period) => (
            <ListItem key={period} divider disablePadding>
              <ListItemButton
                onClick={(e) => {
                  e.preventDefault();
                  setPeriod(period as PaymentPeriod);
                }}
                selected={period === periodState}
                disabled={isSubmitting}
              >
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  spacing={2}
                  width={"100%"}
                  py={1.5}
                >
                  <Typography variant={"subtitle1"}>
                    {t(`subscription.plan.period-select-card.period`, {
                      context: period as PaymentPeriod
                    })}
                  </Typography>
                  <Typography variant={"subtitle1"}>
                    {t("subscription.plan.period-select-card.price", {
                      price: ((getMode(data)[period as PaymentPeriod] || 0) / 100).toFixed(2)
                    })}
                  </Typography>
                </Stack>
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </MainCard>
  );
};

export default PeriodSelectCard;
