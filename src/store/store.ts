import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user";
import { siteSettingSlice } from "./slices/siteSettings";
import { questionIdSlice } from "./slices/questionId";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    siteSetting: siteSettingSlice.reducer,
    questionId: questionIdSlice.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
