import { PaymentPeriod } from "@/types/plan";
import Plan from "@/model/plan";

export enum OrderStatus {
  PENDING = 0, // 未支付
  PAID = 1, // 已支付
  CANCELLED = 2, // 已取消
  FINISHED = 3 // 已完成
}

export interface OrderPayload {
  plan_id: number;
  period: PaymentPeriod;
  coupon_code?: string;
}

export interface CheckoutOrderPayload {
  trade_no: string;
  method: number;
}

export default interface Order {
  id: number;
  invite_user_id: null | number;
  user_id: number;
  plan_id: number;
  coupon_id: null | number;
  payment_id: null | number;
  type: number;
  period: PaymentPeriod;
  trade_no: string;
  callback_no: null | string;
  total_amount: number;
  handling_amount: null | number;
  discount_amount: null | number;
  surplus_amount: null | number;
  refund_amount: null | number;
  balance_amount: null | number;
  surplus_order_ids: null | number[];
  surplus_orders: null | Omit<Order, "plan">[];
  status: OrderStatus;
  commission_status: number;
  commission_balance: number;
  actual_commission_balance: null;
  paid_at: null | number;
  created_at: number;
  updated_at: number;
  plan: Plan;
  try_out_plan_id: number;
}
