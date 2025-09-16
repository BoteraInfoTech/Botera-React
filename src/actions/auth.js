import { BACKEND_POINT } from "../utils/config";
import callApi from "../utils/callApi";

export const registerUser = (data) => {
  const url = `${BACKEND_POINT}/user/singUp`;
  return {
    type: "SIGNUP",
    payload: callApi(url, "POST", data),
  };
};
