import { BACKEND_POINT } from "../utils/config";
import callApi from "../utils/callApi";

export const registerUser = (data) => {
  const url = `${BACKEND_POINT}/user/signUp`;
  return {
    type: "SIGNUP",
    payload: callApi(url, "POST", data),
  };
};

export const loginAction = (data) => {
  const url = `${BACKEND_POINT}/user/login`;
  return {
    type: "LOGIN",
    payload: callApi(url, "POST", data),
  };
};
