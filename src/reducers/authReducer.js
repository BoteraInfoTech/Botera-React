import { setToken } from "../utils/auth";

const initialState = {
  status: null,
  successResponse: null,
  successMessage: "",
  errorResponse: null,
  errorMessage: "",
  isLoading: false,
};

const authReducer = (store = initialState, action) => {
  switch (action.type) {
    case "SIGNUP_FULFILLED": {
      const payload = action.payload;
      const accessToken = payload?.accessToken || payload?.data?.accessToken;
      if (accessToken) {
        setToken(accessToken);
      }
      return {
        ...store,
        isLoading: false,
        successResponse: payload,
        successMessage: payload?.message || "",
        errorMessage: "",
      };
    }
    case "SIGNUP_PENDING": {
      return {
        ...store,
        isLoading: true,
        errorMessage: "",
        successMessage: "",
      };
    }
    case "SIGNUP_REJECTED": {
      const errorData =
        action?.payload?.response?.data ?? action?.payload ?? {};
      const firstReasonMessage = errorData?.reason?.[0]?.message;
      return {
        ...store,
        isLoading: false,
        errorResponse: errorData,
        successMessage: "",
        errorMessage: firstReasonMessage,
      };
    }
    default:
      return store;
  }
};

export default authReducer;
