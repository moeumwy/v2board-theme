export default interface ApiResponse<T = any> {
  data: T;
  errors?: Record<keyof T, string[]>;
  message?: string;
}
