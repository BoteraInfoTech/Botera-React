import { BACKEND_POINT } from "../../../../utils/config";
import callApi from "../../../../utils/callApi";

export const getUserDetails = () => {
  const url = `${BACKEND_POINT}/user/details`;
  return {
    type: "USER_DETAIL",
    payload: callApi(url, "GET"),
  };
};

export const getTaskDetails = () => {
  const url = `${BACKEND_POINT}/dashboard/getTasks`;
  return {
    type: "DASHBOARD_TASK_DETAIL",
    payload: callApi(url, "GET"),
  };
};

export const getDashboardDetails = () => {
  const url = `${BACKEND_POINT}/dashboard/detailsCards`;
  return {
    type: "DASHBOARD_DETAIL",
    payload: callApi(url, "GET"),
  };
};

export const getPerformanceData = () => {
  const url = `${BACKEND_POINT}/dashboard/getPerformance`;
  return {
    type: "DASHBOARD_PERFORMANCE",
    payload: callApi(url, "GET"),
  };
};

export const getRecentConversations = () => {
  const url = `${BACKEND_POINT}/dashboard/recentConversation`;
  return {
    type: "DASHBOARD_CONVERSATION_LIST",
    payload: callApi(url, "GET"),
  };
};
