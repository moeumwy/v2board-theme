import React, { useMemo } from "react";

// third-party
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

// material-ui
import { Grid, Skeleton } from "@mui/material";

// project imports
import MainCard from "@/components/MainCard";
import { useCheckoutContext } from "./context";
import { PaymentPeriod } from "@/types/plan";

export interface LineProps {
  label: string;
  value: React.ReactNode;
}

const ProductInfoCard: React.FC = () => {
  const { t } = useTranslation();
  const {
    detail: { data, isLoading }
  } = useCheckoutContext();

  const nextBillingDate = useMemo(() => {
    const base = dayjs.unix(data?.created_at || 0);
    switch (data?.period) {
      case PaymentPeriod.MONTHLY:
        return base.add(1, "month");
      case PaymentPeriod.QUARTERLY:
        return base.add(3, "month");
      case PaymentPeriod.HALF_YEARLY:
        return base.add(6, "month");
      case PaymentPeriod.YEARLY:
        return base.add(1, "year");
      case PaymentPeriod.TWO_YEARLY:
        return base.add(2, "year");
      case PaymentPeriod.THREE_YEARLY:
        return base.add(3, "year");
      default:
        return base;
    }
  }, [data?.created_at, data?.period]);

  const lines = useMemo<LineProps[]>(
    () => [
      {
        label: t("order.checkout.product-info-card.product-name"),
        value: data?.plan.name
      },
      {
        label: t("order.checkout.product-info-card.product-type"),
        value: t("order.checkout.product-info-card.product-period", {
          context: data?.period
        })
      },
      {
        label: t("order.checkout.product-info-card.traffic"),
        value: t("order.checkout.product-info-card.traffic", {
          count: data?.plan.transfer_enable || 0,
          context: data?.plan.transfer_enable === null ? "unlimited" : "limited"
        })
      },
      ...(data?.period === PaymentPeriod.ONETIME
        ? []
        : [
            {
              label: t("order.checkout.product-info-card.next-billing-date"),
              value: nextBillingDate.format("YYYY/MM/DD")
            }
          ])
    ],
    [data, t, nextBillingDate]
  );

  return (
    <MainCard title={t("order.checkout.product-info-card.title")}>
      <Grid container spacing={1}>
        {lines.map((line, index) => (
          <Grid item xs={12} key={index}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                {line.label}
              </Grid>
              <Grid item xs={8}>
                {isLoading ? <Skeleton variant="text" width="100%" /> : line.value}
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </MainCard>
  );
};

export default ProductInfoCard;
