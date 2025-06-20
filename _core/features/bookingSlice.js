import makeRequest from "../../utils/ApiHelper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
  isLoadingSearchResults: false,
};

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
    console.log("Before makeRequest");

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
      console.log(response);
      return response;
    });
  }
);

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
      });
  },
});

export default persistSlice.reducer;
