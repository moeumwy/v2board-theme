export interface TicketPayload {
  subject: string;
  level: TicketLevel;
  message: string;
}

export enum TicketStatus {
  Open = 0,
  Closed = 1
}

export enum TicketReplyStatus {
  Replied = 0,
  Pending = 1
}

export enum TicketLevel {
  Low = 0,
  Medium = 1,
  High = 2
}

export const TicketLevelMap: Record<TicketLevel, string> = {
  [TicketLevel.Low]: "low",
  [TicketLevel.Medium]: "medium",
  [TicketLevel.High]: "high"
};

export default interface Ticket {
  created_at: number;
  updated_at: number;
  id: number;
  level: TicketLevel;
  reply_status: TicketReplyStatus;
  status: TicketStatus;
  user_id: number;
  message: Message[];
  subject: string;
}

export interface Message {
  id: number;
  user_id: number;
  ticket_id: number;
  message: string;
  created_at: number;
  updated_at: number;
  is_me: boolean;
}

export interface ReplyTicketPayload {
  id: number;
  message: string;
}
