import lo from "lodash-es";

// types
import { AuthProps, AuthActionProps } from "@/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// initial state
export const initialState: AuthProps = {
  isLoggedIn: !lo.isEmpty(localStorage.getItem("gfw_token")),
  isAdmin: localStorage.getItem("gfw_is_admin") === "true"
};

// ==============================|| AUTH REDUCER ||============================== //

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        isAdmin: boolean;
      }>
    ) => {
      state.isLoggedIn = true;
      state.isAdmin = action.payload.isAdmin;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("gfw_token");
      localStorage.removeItem("gfw_is_admin");
    }
  }
});

export const { login, logout } = auth.actions;
export default auth.reducer;
