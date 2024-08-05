export default interface Plan {
  id: number;
  group_id: number;
  transfer_enable: null | number;
  name: string;
  speed_limit: null | number;
  show: number;
  sort: number;
  renew: number;
  content: string;
  month_price: null | number;
  quarter_price: null | number;
  half_year_price: null | number;
  year_price: null | number;
  two_year_price: null | number;
  three_year_price: null | number;
  onetime_price: null | number;
  reset_price: null | number;
  reset_traffic_method: null;
  capacity_limit: null;
  created_at: number;
  updated_at: number;
}
