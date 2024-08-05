export default interface User {
  email: string;
  transfer_enable: number;
  last_login_at: null | number;
  created_at: number;
  banned: 0 | 1;
  remind_expire: 0 | 1;
  remind_traffic: 0 | 1;
  expired_at: null | number;
  balance: number;
  commission_balance: number;
  plan_id: number | null;
  discount: null | number;
  commission_rate: null | number;
  telegram_id: null | number;
  uuid: string;
  avatar_url: string;
}

export interface UserUpdatePayload {
  remind_traffic: 0 | 1;
  remind_expire: 0 | 1;
}
