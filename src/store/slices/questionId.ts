import { UserReducerState } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserReducerState = {
  data: null,
};

export const questionIdSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setQuestionId: (state: any, action) => {
      state.data = action.payload;
    },
  },
});

export const { setQuestionId } = questionIdSlice.actions;
export default questionIdSlice.reducer;
