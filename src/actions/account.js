import { BACKEND_POINT } from "../utils/config";
import callApi from "../utils/callApi";

export const connectAccount = (data) => {
  const url = `${BACKEND_POINT}/account/connectAccount`;
  return {
    type: "CONNECT_ACCOUNT",
    payload: callApi(url, "POST", data),
  };
};

export const getConnectedAccounts = (pageOrParams = 1) => {
  let page = 1;
  let q = "";

  if (typeof pageOrParams === "number") {
    page = pageOrParams;
  } else if (
    typeof pageOrParams === "object" &&
    pageOrParams !== null
  ) {
    page = pageOrParams.page ?? 1;
    q = pageOrParams.q ?? "";
  }

  const searchParam = q ? `&q=${encodeURIComponent(q)}` : "";
  const url = `${BACKEND_POINT}/account/listConnectedAccounts?page=${page}${searchParam}`;
  return {
    type: "GET_CONNECTED_ACCOUNTS",
    payload: callApi(url, "GET"),
  };
};
