import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../components/Utils/User";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
  name: "",
  email: "",
  uid: "",
  isAdmin: false,
  plan: "Free",
  lastBought: 0,
  created: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState(state, { payload }) {
      state.name = payload.name;
      state.email = payload.email;
      state.uid = payload.uid;
      state.isAdmin = payload.isAdmin;
      state.plan = payload.plan;
      state.lastBought = payload.lastBought;
      state.created = payload.created;
    },

    clearUserState(state) {
      console.log("help");
      state.name = "";
      state.email = "";
      state.uid = "";
      state.isAdmin = false;
      state.plan = "Free";
      state.lastBought = 0;
      state.created = 0;
    },
  },
});

export const { setUserState, clearUserState } = userSlice.actions;
