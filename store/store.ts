import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
  },
  devTools: true,
});
