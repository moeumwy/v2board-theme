import { useEffect, useMemo, useState } from "react";
import constate from "constate";
import { useSnackbar } from "notistack";

// project imports
import { useGetPlanQuery } from "@/store/services/api";
import { PaymentPeriod } from "@/types/plan";
import Coupon from "@/model/coupon";
import { getFirstPayment, getMode } from "@/utils/plan";

export interface PlanDetailContextProps {
  id: number;
}

const usePlanDetail = ({ id }: PlanDetailContextProps) => {
  const planQuery = useGetPlanQuery(id);
  const [period, setPeriod] = useState<PaymentPeriod | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [couponCode, setCouponCode] = useState<Coupon | null>(null);

  // 请求完成后，自动选择第一个周期
  useEffect(() => {
    if (planQuery.data && !period) {
      setPeriod(getFirstPayment(planQuery.data));
    }
  }, [planQuery.data, period]);

  // 选择的原始套餐价格
  const originPrice = useMemo(() => {
    if (!planQuery.data) {
      return -1;
    }

    if (!period) {
      return -1;
    }

    const price = getMode(planQuery.data)[period];
    if (!price) {
      return -1;
    }

    return price / 100;
  }, [planQuery.data, period]);

  // 使用优惠券后的价格
  const price = useMemo(() => {
    if (!couponCode) {
      // 无优惠券
      return originPrice;
    } else if (couponCode.type === 1) {
      // 金额抵扣
      return originPrice - couponCode.value / 100;
    } else if (couponCode.type === 2) {
      // 折扣
      return originPrice * (1 - couponCode.value / 100);
    } else {
      return -1;
    }
  }, [couponCode, originPrice]);

  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (planQuery.error) {
      enqueueSnackbar(planQuery.error.message, { variant: "error" });
    }
  }, [planQuery.error, enqueueSnackbar]);

  return {
    id,
    originPrice,
    price,
    planQuery,
    period,
    setPeriod,
    isSubmitting,
    setIsSubmitting,
    couponCode,
    setCouponCode
  };
};

const [PlanDetailProvider, usePlanDetailContext] = constate(usePlanDetail);
export { PlanDetailProvider, usePlanDetailContext };
