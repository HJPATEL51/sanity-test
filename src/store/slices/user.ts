import { UserInterface, UserReducerState } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserReducerState = {
  data: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state: any, action) => {
      state.data = action.payload;
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
