import makeRequest from "../../utils/ApiHelper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  isLoading: false,

  searchResults: [],
  isLoadingSearchResults: false,
};


const persistSlice = createSlice({
  name: "persist",
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
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
      })
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
  },
});

export const login = createAsyncThunk("persist/login", async (payload) => {
  const response = await makeRequest("post", "/api/login", {
    data: payload,
    successMessage: "Login Successfully",
    errorMessage: "Login failed. Please try again.",
  });
  return response;
});


// Search Flight
export const searchFlight = createAsyncThunk(
  "booking/searchFlight",
  async ({ payload, token, secretToken, logoutHandler }) => {
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
      cabin_class: payload.cabinClass || "Economy",
    };

    if (payload.tripType === "Return" && payload.returnDate) {
      requestBody.origin_destinations.push({
        departure_date_time: payload.returnDate,
        origin_location_code: payload.destinationCode,
        destination_location_code: payload.originCode,
      });
    }

    return makeRequest("post", "/api/search", {
      token,
      secretToken,
      data: requestBody,
      logoutCallback: logoutHandler,
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

export const { clearSearchResults } = persistSlice.actions;
export default persistSlice.reducer;
