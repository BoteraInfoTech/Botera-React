const initialState = {
  status: null,
  successResponse: null,
  successMessage: "",
  errorResponse: null,
  errorMessage: "",
  isLoading: false,
  accounts: [],
  isLoadingAccounts: false,
  totalPage: 1,
  currentPage: 1,
  totalAccounts: 0,
};

const accountReducer = (store = initialState, action) => {
  switch (action.type) {
    case "CONNECT_ACCOUNT_FULFILLED": {
      const payload = action.payload;
      return {
        ...store,
        isLoading: false,
        successResponse: payload,
        successMessage: payload?.message || "Account connected successfully",
        errorMessage: "",
        status: "success",
      };
    }
    case "CONNECT_ACCOUNT_PENDING": {
      return {
        ...store,
        isLoading: true,
        errorMessage: "",
        successMessage: "",
        status: "pending",
      };
    }
    case "CONNECT_ACCOUNT_REJECTED": {
      const errorData =
        action?.payload?.response?.data ?? action?.payload ?? {};
      const firstReasonMessage =
        errorData?.reason?.[0]?.message ||
        errorData?.message ||
        "Failed to connect account";
      return {
        ...store,
        isLoading: false,
        errorResponse: errorData,
        successMessage: "",
        errorMessage: firstReasonMessage,
        status: "fail",
      };
    }
    case "GET_CONNECTED_ACCOUNTS_FULFILLED": {
      const payload = action.payload;
      return {
        ...store,
        isLoadingAccounts: false,
        accounts: payload?.data || [],
        totalPage: payload?.totalPage ?? store.totalPage,
        currentPage: payload?.currentPage ?? store.currentPage,
        totalAccounts:
          payload?.totalAccounts ??
          store.totalAccounts ??
          (Array.isArray(payload?.data) ? payload.data.length : 0),
        errorMessage: "",
      };
    }
    case "GET_CONNECTED_ACCOUNTS_PENDING": {
      return {
        ...store,
        isLoadingAccounts: true,
      };
    }
    case "GET_CONNECTED_ACCOUNTS_REJECTED": {
      const errorData =
        action?.payload?.response?.data ?? action?.payload ?? {};
      return {
        ...store,
        isLoadingAccounts: false,
        accounts: [],
        totalPage: 1,
        currentPage: 1,
        totalAccounts: 0,
        errorMessage: errorData?.message || "Failed to fetch accounts",
      };
    }
    default:
      return store;
  }
};

export default accountReducer;
