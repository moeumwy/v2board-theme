export interface PaymentMethod {
  id: number;
  icon: string | null;
  name: string;
  payment: string;
  handling_fee_fixed: number | null;
  handling_fee_percent: number | null;
}
