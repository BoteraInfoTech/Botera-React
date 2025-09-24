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
    case "USER_DETAIL_FULFILLED": {
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
    case "USER_DETAIL_PENDING": {
      return {
        ...store,
        isLoading: true,
        errorMessage: "",
        successMessage: "",
        status: "pending",
      };
    }
    case "USER_DETAIL_REJECTED": {
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
    case "USER_DELETE_FULFILLED": {
      const payload = action.payload;
      return {
        ...store,
        isLoading: false,
        successResponse: null,
        successMessage: payload?.message || "",
        errorMessage: "",
        status: "deleteSuccess",
      };
    }
    case "USER_DELETE_PENDING": {
      return {
        ...store,
        isLoading: true,
        errorMessage: "",
        successMessage: "",
        status: "pending",
      };
    }
    case "USER_DELETE_REJECTED": {
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
    case "USER_UPDATE_FULFILLED": {
      const payload = action.payload;
      return {
        ...store,
        isLoading: false,
        successResponse: payload,
        successMessage: payload?.message || "",
        errorMessage: "",
        status: "updateSuccess",
      };
    }
    case "USER_UPDATE_PENDING": {
      return {
        ...store,
        isLoading: true,
        errorMessage: "",
        successMessage: "",
        status: "pending",
      };
    }
    case "USER_UPDATE_REJECTED": {
      const errorData =
        action?.payload?.response?.data ?? action?.payload ?? {};
      const firstReasonMessage =
        errorData?.reason?.[0]?.message || "Something went wrong ";
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
