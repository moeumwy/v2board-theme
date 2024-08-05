export interface TrafficLog {
  d: number; // download, in bytes
  record_at: number;
  server_rate: string;
  u: number; // upload, in bytes
  user_id: number;
}
