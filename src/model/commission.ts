export default interface Commission {
  created_at: number;
  get_amount: number;
  id: number;
  order_amount: number;
  trade_no: string;
}

export interface CommissionQuery {
  current: number;
  page_size: number;
}

export interface CommissionResponse {
  data: Commission[];
  total: number;
}
