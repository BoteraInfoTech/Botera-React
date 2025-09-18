import { BACKEND_POINT } from "../../../../utils/config";
import callApi from "../../../../utils/callApi";

export const getUserDetails = (data) => {
  const url = `${BACKEND_POINT}/user/details`;
  return {
    type: "USER_DETAIL",
    payload: callApi(url, "GET", data),
  };
};
