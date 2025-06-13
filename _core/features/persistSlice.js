import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeRequest from "../../utils/ApiHelper";

const initialState = {
  userData: null,
  isLoading: false,

  searchForm: null,
  allFormData: null,
  prevTraveller: null,
  disableTravelers: null,

  isUpdatingAccount: false,
};

const persistSlice = createSlice({
  name: "persist",
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      state.userData = action.payload;
    },
    setSearchForm: (state, action) => {
      state.searchForm = action.payload;
    },
    setBookingStates: (state, action) => {
      state.allFormData = action.payload.formData;
      state.prevTraveller = action.payload.traveller;
      state.disableTravelers = action.payload.disabled;
    },
    emptyBookingStates: (state, action) => {
      state.allFormData = null;
      state.prevTraveller = null;
      state.disableTravelers = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload; // Save logged-in user data on success
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateAccount.pending, (state) => {
        state.isUpdatingAccount = true;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.isUpdatingAccount = false;

        // Only update the `user` field within `userData`, preserving other parts like auth tokens.
        state.userData = {
          ...state.userData,
          user: action.payload,
        };
      })
      .addCase(updateAccount.rejected, (state) => {
        state.isUpdatingAccount = false;
      })

      .addCase(uploadUserImage.fulfilled, (state, action) => {
        // Update nested `user.image_url` property while preserving all other user data
        state.userData = {
          ...state.userData,
          user: {
            ...state.userData.user,
            image_url: action.payload.image_url,
          },
        };
      })
      .addCase(getUserInfo.pending, (state) => {
        state.isLoadingUserInfo = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoadingUserInfo = false;

        // Merge the user object from the response with any existing userData state.
        // This ensures only the 'user' key is replaced, preserving other session info like tokens.
        state.userData = {
          ...state.userData,
          user: action.payload,
        };
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.isLoadingUserInfo = false;
      });
  },
});

// Login user with credentials
export const login = createAsyncThunk("persist/login", (payload) =>
  makeRequest("post", "/api/login", {
    data: payload,
    successMessage: "Login Successfully",
    errorMessage: "Login failed. Please try again.",
  })
);

// Update user profile/account info
export const updateAccount = createAsyncThunk(
  "persist/updateAccount",
  ({ token, data }) =>
    makeRequest("put", "/api/user/update-account", {
      data,
      token,
      successMessage: "Account updated successfully",
      errorMessage: "Failed while updating your Account",
    })
);

// Upload user profile image (multipart/form-data)
export const uploadUserImage = createAsyncThunk(
  "persist/uploadUserImage",
  async ({ img, token }) => {
    const response = await makeRequest("post", "/api/user/image", {
      token,
      headers: {
        "Content-Type": "multipart/form-data", // Important for uploading files
      },
      data: img,
      successMessage: "Image uploaded successfully",
    });
    return response;
  }
);

// Fetch current user's data (with token + optional logout callback)
export const getUserInfo = createAsyncThunk(
  "persist/getUserInfo",
  ({ token, logoutHandler }) =>
    makeRequest("get", "/api/me", {
      token,
      logoutCallback: logoutHandler, // Logout on failure if session expired or token invalid
      errorMessage: "Something went wrong. Please try again.",
    })
);

export const {
  updateUserData,
  setSearchForm,
  setBookingStates,
  emptyBookingStates,
} = persistSlice.actions;

export default persistSlice.reducer;
