import makeRequest from "../../utils/ApiHelper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  routes: [],
  loadingRoutes: false,

  isBookingLoading: false,
  bookingMessage: null,
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
      .addCase(confirmBooking.pending, (state) => {
        state.isBookingLoading = true;
      })
      .addCase(confirmBooking.fulfilled, (state, action) => {
        state.isBookingLoading = false;
        state.bookingMessage = action.payload.message;
      })
      .addCase(confirmBooking.rejected, (state, action) => {
        state.isBookingLoading = false;
      })
  },
});


// Get Routes
export const getRoutes = createAsyncThunk(
  "booking/getRoutes",
  ({ token, secretToken, logoutHandler }) =>
    makeRequest("get", "/api/booking-all-active-routes", {
      token,
      secretToken,
      showNoErrors: true,
      logoutCallback: logoutHandler,
    }).then((response) => response.Routes || [])
);

// Confirm Booking
export const confirmBooking = createAsyncThunk(
  "booking/confirmBooking",
  ({ data, token, secretToken, logoutHandler }) =>
    makeRequest("post", "/api/booking", {
      data,
      token,
      secretToken,
      logoutCallback: logoutHandler,
      errorMessage: "Failed to confirm booking",
      successMessage: "Booking created successfully",
    }).then(() => ({ status: true, message: "Booking Created" }))
);

export default persistSlice.reducer;
