import { combineReducers } from "redux";
import authReducer from "./authReducer";
import dashboardReducer from "./dashboard";
import dashboardTask from "./dashboardTask";
import dashboardDetails from "./dashboardDetails";
import dashboardPerformance from "./dashboardPerformance";
import dashboardConversation from "./dashboardConversation";
import externalMedia from "./externalMedia";
// All reducers combined
const appReducers = combineReducers({
  authReducer,
  userDetails: dashboardReducer,
  dashboardTask,
  dashboardDetails,
  dashboardPerformance,
  dashboardConversation,
  externalMedia,
});

// Root reducer with reset on logout
const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined; // reset all slices
  }
  return appReducers(state, action);
};

export default rootReducer;
