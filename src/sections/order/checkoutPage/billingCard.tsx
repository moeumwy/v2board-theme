import React, { useCallback, useMemo } from "react";

// third-party
import { useTranslation } from "react-i18next";

// material-ui
import { Button, Divider, Skeleton, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";

// project imports
import MainCard from "@/components/MainCard";
import { useCheckoutOrderMutation } from "@/store/services/api";
import { useCheckoutContext } from "@/sections/order/checkoutPage/context";
import ReactGA from "react-ga4";

const BillingCard: React.FC = () => {
  const { t } = useTranslation();
  const {
    detail: { data: detailData, isLoading },
    paymentMethodState,
    paymentMethodIndex,
    setSubmitting,
    isSubmitting
  } = useCheckoutContext();
  const [checkoutOrder] = useCheckoutOrderMutation();
  const { enqueueSnackbar } = useSnackbar();

  const lines = useMemo<
    {
      label: React.ReactNode;
      value: React.ReactNode;
    }[]
  >(
    () => [
      {
        label: detailData?.plan.name,
        value: t("order.checkout.billing-card.price", {
          value: Number((detailData?.plan[detailData?.period] ?? 0) / 100).toFixed(2)
        })
      },
      ...(detailData?.discount_amount || detailData?.surplus_amount
        ? [
            {
              label: t("order.checkout.billing-card.deduction"),
              value: t("order.checkout.billing-card.price", {
                value: (((detailData?.discount_amount ?? 0) + (detailData?.surplus_amount ?? 0)) / -100).toFixed(2)
              })
            }
          ]
        : []),
      {
        label: t("order.checkout.billing-card.total-price"),
        value: t("order.checkout.billing-card.price", {
          value: Number((detailData?.total_amount ?? 0) / 100).toFixed(2)
        })
      }
    ],
    [detailData, t]
  );

  const handleClick = useCallback(
    async (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      if (detailData && paymentMethodState) {
        try {
          setSubmitting(true);

          ReactGA.event("click", {
            category: "order",
            label: "checkout",
            method: paymentMethodIndex.get(paymentMethodState)?.name,
            method_id: paymentMethodState
          });

          // redirect to payment page
          window.location.href = await checkoutOrder({
            trade_no: detailData.trade_no,
            method: paymentMethodState
          }).unwrap();
        } catch (err) {
          console.error(err);
          enqueueSnackbar(t("notice::checkout-failed"), { variant: "error" });
          ReactGA.event("click", {
            category: "order",
            label: "checkout",
            method: paymentMethodIndex.get(paymentMethodState)?.name,
            method_id: paymentMethodState,
            success: false,
            error: err
          });
        } finally {
          setSubmitting(false);
        }
      } else {
        enqueueSnackbar(t("notice::data-not-loaded"), { variant: "error" });
      }
    },
    [checkoutOrder, detailData, paymentMethodState]
  );

  return (
    <MainCard title={t("order.checkout.billing-card.title")}>
      <Stack spacing={2} divider={<Divider />}>
        {lines.map((line, index) =>
          isLoading ? (
            <Skeleton key={index} variant="text" width="100%" height={40} />
          ) : (
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} key={index}>
              <Typography variant={"body1"}>{line.label}</Typography>
              <Typography variant={"body1"}>{line.value}</Typography>
            </Stack>
          )
        )}
        <Button fullWidth variant={"contained"} disabled={isLoading || isSubmitting} onClick={handleClick}>
          {t("order.checkout.billing-card.button")}
        </Button>
      </Stack>
    </MainCard>
  );
};

export default BillingCard;
