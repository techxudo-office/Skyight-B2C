// File: features/persistSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import makeRequest from "../../utils/ApiHelper";

// ----- Types -----
export interface UserData {
  id: string;
  email: string;
  // add other user fields
}
export interface PersistState {
  userData: UserData | null;
  isLoading: boolean;
}
export interface LoginPayload {
  email: string;
  password: string;
}

const initialState: PersistState = {
  userData: null,
  isLoading: false,
};

export const login = createAsyncThunk<UserData, LoginPayload>(
  "persist/login",
  async (payload, thunkAPI) => {
    const response = await makeRequest(
      "post",
      "/api/login",
      {
        data: payload,
        successMessage: "Login Successfully",
        errorMessage: "Login failed. Please try again.",
      }
    );
    return response as UserData;
  }
);

const persistSlice = createSlice({
  name: "persist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.isLoading = false;
          state.userData = action.payload;
        }
      )
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default persistSlice.reducer;
