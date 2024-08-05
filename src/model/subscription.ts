import type Plan from "@/model/plan";

export default interface Subscription {
  plan_id: number | null;
  token: string;
  expired_at: number | null;
  u: number;
  d: number;
  transfer_enable: number;
  email: string;
  uuid: string;
  plan: Plan | null;
  subscribe_url: string;
  reset_day: number | null;
}
