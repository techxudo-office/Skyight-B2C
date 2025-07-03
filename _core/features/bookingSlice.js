import makeRequest from "../../utils/ApiHelper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
  isLoadingSearchResults: false,

  routes: [],
  loadingRoutes: false,
};

const persistSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchFlight.pending, (state) => {
        state.isLoadingSearchResults = true;
      })
      .addCase(searchFlight.fulfilled, (state, action) => {
        state.isLoadingSearchResults = false;
        state.searchResults = action.payload;
      })
      .addCase(searchFlight.rejected, (state, action) => {
        state.isLoadingSearchResults = false;
      })
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

// Search Flight
export const searchFlight = createAsyncThunk(
  "booking/searchFlight",
  async ({ payload, token }) => {
    const requestBody = {
      trip_type: payload.tripType,
      origin_destinations: [
        {
          departure_date_time: payload.departureDate,
          origin_location_code: payload.originCode,
          destination_location_code: payload.destinationCode,
        },
      ],
      adult_quantity: payload.adult,
      child_quantity: payload.child,
      infant_quantity: payload.infant,
    };

    if (payload.tripType === "Return" && payload.returnDate) {
      requestBody.origin_destinations.push({
        departure_date_time: payload.returnDate,
        origin_location_code: payload.destinationCode,
        destination_location_code: payload.originCode,
      });
    }

    return makeRequest("post", "/api/search", {
      data: requestBody,
      token,
      errorMessage: "No Flight Found!",
    }).then((response) => {
      if (
        !response ||
        response.length === 0 ||
        !response.PricedItineraries?.PricedItinerary?.length
      ) {
        throw new Error("No Flight Found!");
      }
      return response?.PricedItineraries?.PricedItinerary;
    });
  }
);

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
