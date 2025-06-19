import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "../../utils/ApiHelper";

const initialState = {
  userData: null,
  isLoadingSignup: false,
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoadingSignup = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoadingSignup = false;
        state.userData = action.payload;
      })
      .addCase(signup.rejected, (state) => {
        state.isLoadingSignup = false;
      });
  },
});

export const signup = createAsyncThunk("auth/signup", async (payload) => {
  const response = await makeRequest("post", "/api/signup", {
    data: payload,
    successMessage: "Signup Successfully",
    errorMessage: "Signup failed. Please try again.",
  });
  return response;
});

export default roleSlice.reducer;
