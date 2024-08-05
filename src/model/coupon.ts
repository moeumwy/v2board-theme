import { PaymentPeriod } from "@/types/plan";

export default interface Coupon {
  id: number;
  code: string;
  name: string;
  type: 1 | 2; // @enum 1: 金额, 2: 折扣
  value: number; // 抵扣金额 or 折扣（0-1）
  show: 0 | 1; // @enum 0: 不显示, 1: 显示
  limit_use: null | number; // 最大使用次数 @enum null: 不限制, number: 限制次数
  limit_use_with_user: null | number; // 每个用户可使用次数 @enum null: 不限制, number: 限制次数
  limit_plan_ids: null | string[];
  limit_period: null | PaymentPeriod[];
  started_at: number | null;
  ended_at: number | null;
  created_at: number | null;
  updated_at: number | null;
}

export interface CouponPayload {
  code: string;
  plan_id: number;
}
