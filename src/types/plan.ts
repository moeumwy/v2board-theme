export enum PlanType {
  PERIOD = "period", // 周期
  TRAFFIC = "traffic" // 流量，一次性
}

export enum PaymentPeriod {
  ONETIME = "onetime_price", // 一次性
  MONTHLY = "month_price", // 每月
  QUARTERLY = "quarter_price", // 每季度
  HALF_YEARLY = "half_year_price", // 每半年
  YEARLY = "year_price", // 每年
  TWO_YEARLY = "two_year_price", // 每两年
  THREE_YEARLY = "three_year_price" // 每三年
}
