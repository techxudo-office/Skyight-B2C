import makeRequest from "../../utils/ApiHelper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  routes: [],
  loadingRoutes: false,
};

const persistSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoutes.pending, (state) => {
        state.loadingRoutes = true;
      })
      .addCase(getRoutes.fulfilled, (state, action) => {
        state.loadingRoutes = false;
        state.routes = action.payload;
      })
      .addCase(getRoutes.rejected, (state, action) => {
        state.loadingRoutes = false;
      })
  },
});


// Get Routes
export const getRoutes = createAsyncThunk(
  "booking/getRoutes",
  ({ token, logoutHandler }) =>
    makeRequest("get", "/api/booking-all-active-routes", {
      token,
      logoutCallback: logoutHandler,
      showNoErrors: true,
    }).then((response) => response.Routes || [])
);

export default persistSlice.reducer;
