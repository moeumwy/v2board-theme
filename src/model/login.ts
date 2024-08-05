export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  auth_data: string;
  is_admin: boolean;
  token: string;
};
