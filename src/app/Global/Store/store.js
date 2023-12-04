"use client";
import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../features/User/loginSlice";
import signipSlice from "../features/User/signupSlice";
import myDetails from "../features/User/myDetails";
const store = configureStore({
  reducer: {
    login: loginSlice,
    signup: signipSlice,
    myDetails: myDetails,
  },
});

export default store;
