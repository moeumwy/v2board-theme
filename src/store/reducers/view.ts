import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeOptions } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

export interface ViewState {
  theme: {
    mode: PaletteMode | "system" | "time";
  };
}

const initialState: ViewState = {
  theme: {
    mode: (localStorage.getItem("theme_mode") as PaletteMode) || "system"
  }
};

const view = createSlice({
  name: "view",
  initialState,
  reducers: {
    setThemeMode(state, action: PayloadAction<ViewState["theme"]["mode"]>) {
      state.theme.mode = action.payload;
      localStorage.setItem("theme_mode", action.payload);
    }
  }
});

export const { setThemeMode } = view.actions;
export default view.reducer;
