import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupApi = createAsyncThunk("signupApi", async (body) => {
  const baseUrl = `http://localhost:3000/api/user/signup`;
  const response = await axios.post(baseUrl, body);
  return await response;
});
const signupSlice = createSlice({
  name: "signupSlice",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupApi.pending, (state, action) => {
        state.isLoading = true;
        state.data = null;
      })
      .addCase(signupApi.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(signupApi.rejected, (state, action) => {
        state.isError = true;
        state.data = null;
      });
  },
});

export default signupSlice.reducer;
