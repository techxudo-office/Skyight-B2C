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
  ({ token, logoutHandler }) =>
    makeRequest("get", "/api/booking-all-active-routes", {
      token,
      logoutCallback: logoutHandler,
      showNoErrors: true,
    }).then((response) => response.Routes || [])
);

// Confirm Booking
export const confirmBooking = createAsyncThunk(
  "booking/confirmBooking",
  ({ data, token }) =>
    makeRequest("post", "/api/booking", {
      data,
      token,
      successMessage: "Booking created successfully",
      errorMessage: "Failed to confirm booking",
    }).then(() => ({ status: true, message: "Booking Created" }))
);

export default persistSlice.reducer;
