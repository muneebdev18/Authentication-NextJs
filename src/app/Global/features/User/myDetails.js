import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const myDetailsApi = createAsyncThunk("myDetailsApi", async () => {
  const reponse = await axios.get(`http://localhost:3000/api/user/me`);
  console.log(reponse.data.data);
});
const myDetails = createSlice({
  name: "myDetails",
  initialState: {
    isLoading: false,
    isError: false,
    data: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(myDetailsApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(myDetailsApi.fulfilled, (state, actions) => {
        state.data.push(actions.payload.data);
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(myDetailsApi.rejected, (state) => {
        state.isError = true;
      });
  },
});

export default myDetails.reducer;
