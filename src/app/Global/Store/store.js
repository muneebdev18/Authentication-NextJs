"use client";
import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../features/User/loginSlice";
import signipSlice from "../features/User/signupSlice";
const store = configureStore({
  reducer: {
    login: loginSlice,
    signup: signipSlice,
  },
});

export default store;
