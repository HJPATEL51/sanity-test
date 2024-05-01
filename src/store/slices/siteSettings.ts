import { UserInterface, siteSettingReducerState } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState: siteSettingReducerState = {
  data: null,
};

export const siteSettingSlice = createSlice({
  name: "siteSetting",
  initialState,
  reducers: {
    setSiteSetting: (state: any, action) => {
      state.data = action.payload;
    },
  },
});

export const { setSiteSetting } = siteSettingSlice.actions;
export default siteSettingSlice.reducer;
