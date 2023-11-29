import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const loginApi = createAsyncThunk("loginApi", async (body) => {
  const baseUrl = "http://localhost:3000/api/user/login";
  const response = await axios.post(baseUrl, body);
  console.log(response.data);
  return await response.data;
});
const loginSlice = createSlice({
  name: "loginSlice",
  initialState: {
    isLoading: false,
    isError: false,
    data: null,
    success: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginApi.pending, (state, action) => {
        state.isLoading = false;
        state.data = null;
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload.data;
        state.success = action.payload.success;
      })
      .addCase(loginApi.rejected, (state, action) => {
        state.isError = true;
      });
  },
});

export default loginSlice.reducer;
