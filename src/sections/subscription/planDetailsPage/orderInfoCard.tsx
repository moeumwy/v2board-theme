import React, { useEffect } from "react";

// third-party
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

// material-ui
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";

// project imports
import MainCard from "@/components/MainCard";
import { usePlanDetailContext } from "@/sections/subscription/planDetailsPage/context";
import { useSaveOrderMutation } from "@/store/services/api";
import { PaymentPeriod } from "@/types/plan";

const OrderInfoCard: React.FC = () => {
  const { t } = useTranslation();
  const {
    planQuery: { data: planData },
    originPrice,
    price,
    couponCode,
    setIsSubmitting,
    isSubmitting,
    period
  } = usePlanDetailContext();

  const [createOrder, { isLoading }] = useSaveOrderMutation();
  useEffect(() => {
    setIsSubmitting(isLoading);
  }, [isLoading, setIsSubmitting]);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    plan_id: Yup.number().required(t("notice::data-not-loaded").toString()),
    period: Yup.string()
      .oneOf([
        PaymentPeriod.ONETIME,
        PaymentPeriod.MONTHLY,
        PaymentPeriod.QUARTERLY,
        PaymentPeriod.HALF_YEARLY,
        PaymentPeriod.YEARLY,
        PaymentPeriod.TWO_YEARLY,
        PaymentPeriod.THREE_YEARLY
      ])
      .required(t("notice::period-not-selected").toString()),
    coupon_code: Yup.string().nullable()
  });

  const handleClick = () => {
    const payload = {
      plan_id: planData?.id,
      coupon_code: couponCode?.code,
      period: period
    };

    schema
      .isValid(payload)
      .then(() => {
        createOrder({
          plan_id: payload.plan_id!,
          coupon_code: payload.coupon_code,
          period: payload.period!
        })
          .unwrap()
          .then((res) => {
            console.log("order created:", res);
            enqueueSnackbar(t("notice::order-created").toString(), {
              variant: "success"
            });
            navigate(`/order/${res}`); // 跳转订单结算页面
          })
          .catch((err) => {
            console.error(err);
            enqueueSnackbar(err.message, { variant: "error" });
          });
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar(`${err.name}: ${Array.from<string>(err.errors).join(", ")}`, {
          variant: "error"
        });
      });
  };

  return (
    <MainCard title={t("subscription.plan.order-info-card.title")}>
      <Stack spacing={2} divider={<Divider />}>
        {planData && (
          <Stack direction={"row"} justifyContent={"space-between"} spacing={1}>
            <Typography variant={"body1"}>{planData?.name}</Typography>
            <Typography variant={"body1"}>
              {t("subscription.plan.order-info-card.price", {
                price: Number(originPrice).toFixed(2)
              })}
            </Typography>
          </Stack>
        )}
        {couponCode && (
          <Stack direction={"row"} justifyContent={"space-between"} spacing={1}>
            <Typography variant={"body1"}>
              {t("subscription.plan.order-info-card.coupon", {
                name: couponCode.name
              })}
            </Typography>
            <Typography variant={"body1"}>
              {t("subscription.plan.order-info-card.price", {
                price: Number(
                  couponCode.type === 1 ? (couponCode.value / 100) * -1 : (couponCode.value / 100) * -1 * originPrice
                ).toFixed(2)
              })}
            </Typography>
          </Stack>
        )}
        <Stack direction={"column"} spacing={2}>
          <Typography variant={"subtitle1"}>{t("subscription.plan.order-info-card.total")}</Typography>
          <Typography variant={"h2"} component={"span"}>
            {t("subscription.plan.order-info-card.price", {
              price: Number(price).toFixed(2)
            })}
          </Typography>
          <Button fullWidth variant={"contained"} color={"primary"} onClick={handleClick} disabled={isSubmitting}>
            {t("subscription.plan.order-info-card.button")}
          </Button>
        </Stack>
      </Stack>
    </MainCard>
  );
};

export default OrderInfoCard;
