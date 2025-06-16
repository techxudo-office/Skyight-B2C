// File: utils/ApiHelper.ts
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
    token = "",
    headers = {},
    successMessage = "",
    errorMessage = "",
    logoutCallback = () => {},
    showNoErrors = false,
  }
) => {
  try {
    const config = {
      method,
      url: endpoint,
      ...(data && { data }),
      headers: {
        ...(token ? { Authorization: token } : {}),
        ...headers,
      },
    };
    const response = await apiClient(config);
    if (successMessage) toast.success(successMessage);
    return (
      response.data?.data || response.data?.message || response.data || response
    );
  } catch (error) {
    const status = error.response?.status;
    const apiErrors = error.response?.data?.data?.errors;
    const errorMsg =
      error.response?.data?.message ||
      errorMessage ||
      "Something went wrong. Please try again.";
    if (status === 401 && logoutCallback) logoutCallback();
    if (apiErrors && typeof apiErrors === "object") {
      const firstError = Object.values(apiErrors)[0];
      if (!showNoErrors) toast.error(firstError || errorMsg);
      throw firstError;
    } else {
      if (!showNoErrors) toast.error(errorMsg);
      throw errorMsg;
    }
  }
};

export default makeRequest;
