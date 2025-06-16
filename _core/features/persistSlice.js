// File: features/persistSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "../../utils/ApiHelper";

const initialState = {
  userData: null,
  isLoading: false,
};

export const login = createAsyncThunk("persist/login", async (payload) => {
  const response = await makeRequest("post", "/api/login", {
    data: payload,
    successMessage: "Login Successfully",
    errorMessage: "Login failed. Please try again.",
  });
  return response;
});

const persistSlice = createSlice({
  name: "persist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default persistSlice.reducer;
