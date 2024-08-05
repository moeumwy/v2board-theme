export interface InviteCodeData {
  code: string;
  created_at: number;
  id: number;
  pv: number;
  status: InviteCodeStatus;
  updated_at: number;
  user_id: number;
}

export enum InviteCodeStatus {
  OK = 0
}

export default interface InviteData {
  codes: InviteCodeData[];
  stat: {
    0: number; // 已注册用户数
    1: number; // 累计获得佣金
    2: number; // 确认中的佣金
    3: number; // 佣金比例
    4: number; // 当前剩余佣金
  };
}
