import axios from "axios";
import { BASE_URL } from "./ApiBaseUrl";
import toast from "react-hot-toast";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const makeRequest = async (
  method,
  endpoint,
  {
    data = null,
    token = null,
    headers = {},
    successMessage = null,
    errorMessage = null,
    logoutCallback = null,
    showNoErrors = false,
  }
) => {
  try {
    // Build axios request config, including method, URL, optional payload, and headers
    const config = {
      method,
      url: endpoint,
      ...(data && { data }), // only include `data` key if payload exists
      headers: {
        ...(token && { Authorization: token }), // attach auth token if provided
        ...headers, // merge in any additional custom headers (e.g., multipart)
      },
    };

    const response = await apiClient(config);

    if (successMessage) {
      // Display success toast when applicable
      toast.success(successMessage);
    }

    // Return the most relevant field from response, prioritizing nested data or message
    return (
      response.data?.data || // actual payload under `data`
      response.data?.message || // fallback to message field
      response.data || // or return full data object
      response // or full axios response if none of the above
    );
  } catch (error) {
    const status = error.response?.status;
    // API may return validation errors under data.errors
    const apiErrors = error.response?.data?.data?.errors;
    // Fallback to a general or custom error message
    const errorMsg =
      error.response?.data?.message ||
      errorMessage ||
      "Something went wrong. Please try again.";

    if (status === 401 && typeof logoutCallback === "function") {
      // Unauthorized—invoke provided logout handler (e.g., clear session)
      logoutCallback();
    }

    if (apiErrors && typeof apiErrors === "object") {
      // Extract first nested validation error
      const firstError = Object.values(apiErrors)[0];
      // Show toast unless told to suppress errors
      !showNoErrors && toast.error(firstError || errorMsg);
      throw firstError; // propagate the specific validation message
    } else {
      // No structured errors; show general message
      !showNoErrors && toast.error(errorMsg);
      throw errorMsg;
    }
  }
};

export default makeRequest;
