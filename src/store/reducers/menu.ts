// types
import { MenuProps } from "@/types/menu";
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState: MenuProps = {
  openItem: ["dashboard"],
  openComponent: "buttons",
  drawerOpen: localStorage.getItem("menu_drawerOpen") === "true",
  componentDrawerOpen: true
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
  name: "menu",
  initialState,
  reducers: {
    activeItem(state, action) {
      state.openItem = action.payload.openItem;
    },

    activeComponent(state, action) {
      state.openComponent = action.payload.openComponent;
    },

    openDrawer(state, action) {
      state.drawerOpen = action.payload.drawerOpen;
      localStorage.setItem("menu_drawerOpen", state.drawerOpen.toString());
    },

    openComponentDrawer(state, action) {
      state.componentDrawerOpen = action.payload.componentDrawerOpen;
    }
  }
});

export default menu.reducer;

export const { activeItem, activeComponent, openDrawer, openComponentDrawer } = menu.actions;
