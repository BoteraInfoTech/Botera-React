import { BACKEND_POINT } from "../../../../utils/config";
import callApi from "../../../../utils/callApi";

export const deleteUser = () => {
  const url = `${BACKEND_POINT}/user/delete`;
  return {
    type: "USER_DELETE",
    payload: callApi(url, "DELETE"),
  };
};

export const updateUser = (data) => {
  const url = `${BACKEND_POINT}/user/update`;
  return {
    type: "USER_UPDATE",
    payload: callApi(url, "PUT", data),
  };
};
