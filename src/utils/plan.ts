import lo from "lodash-es";

// types
import Plan from "@/model/plan";
import { PaymentPeriod } from "@/types/plan";

export const getMode = (plan: Plan) => {
  let result: Partial<Record<PaymentPeriod, number>> = {};

  if (lo.isNumber(plan.onetime_price)) {
    result[PaymentPeriod.ONETIME] = plan.onetime_price;
  }

  if (lo.isNumber(plan.month_price)) {
    result[PaymentPeriod.MONTHLY] = plan.month_price;
  }

  if (lo.isNumber(plan.quarter_price)) {
    result[PaymentPeriod.QUARTERLY] = plan.quarter_price;
  }

  if (lo.isNumber(plan.half_year_price)) {
    result[PaymentPeriod.HALF_YEARLY] = plan.half_year_price;
  }

  if (lo.isNumber(plan.year_price)) {
    result[PaymentPeriod.YEARLY] = plan.year_price;
  }

  if (lo.isNumber(plan.two_year_price)) {
    result[PaymentPeriod.TWO_YEARLY] = plan.two_year_price;
  }

  if (lo.isNumber(plan.three_year_price)) {
    result[PaymentPeriod.THREE_YEARLY] = plan.three_year_price;
  }

  return result;
};

export const getMinPrice = (plan: Plan) => {
  const mode = getMode(plan);
  return lo.min(Object.values(mode)) || 0;
};

export const getMaxPrice = (plan: Plan) => {
  const mode = getMode(plan);
  return lo.max(Object.values(mode)) || 0;
};

export const getPrice = (plan: Plan, period: PaymentPeriod) => {
  const mode = getMode(plan);
  return mode[period] || 0;
};

export const paymentPriority = [
  PaymentPeriod.ONETIME,
  PaymentPeriod.MONTHLY,
  PaymentPeriod.QUARTERLY,
  PaymentPeriod.YEARLY,
  PaymentPeriod.HALF_YEARLY,
  PaymentPeriod.TWO_YEARLY,
  PaymentPeriod.THREE_YEARLY
];
export const getFirstPayment = (plan: Plan) => {
  const mode = getMode(plan);
  const firstPayment = paymentPriority.find((period) => lo.isNumber(mode[period]));
  return firstPayment || null;
};
