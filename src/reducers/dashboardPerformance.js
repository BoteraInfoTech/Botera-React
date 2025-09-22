const initialState = {
  status: null,
  successResponse: null,
  successMessage: "",
  errorResponse: null,
  errorMessage: "",
  isLoading: true,
};

const dashboardReducer = (store = initialState, action) => {
  switch (action.type) {
    case "DASHBOARD_PERFORMANCE_FULFILLED": {
      const payload = action.payload;
      return {
        ...store,
        isLoading: false,
        successResponse: payload,
        successMessage: payload?.message || "",
        errorMessage: "",
        status: "success",
      };
    }
    case "DASHBOARD_PERFORMANCE_PENDING": {
      return {
        ...store,
        isLoading: true,
        errorMessage: "",
        successMessage: "",
        status: "pending",
      };
    }
    case "DASHBOARD_PERFORMANCE_REJECTED": {
      const errorData =
        action?.payload?.response?.data ?? action?.payload ?? {};
      const firstReasonMessage = errorData?.reason?.[0]?.message;
      return {
        ...store,
        isLoading: false,
        errorResponse: errorData,
        successMessage: "",
        errorMessage: firstReasonMessage,
        status: "fail",
      };
    }
    default:
      return store;
  }
};

export default dashboardReducer;
