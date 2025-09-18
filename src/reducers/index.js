import { combineReducers } from "redux";
import authReducer from "./authReducer";
import dashboardReducer from "./dashboard";

// All reducers combined
const appReducers = combineReducers({
  authReducer,
  userDetails: dashboardReducer,
});

// Root reducer with reset on logout
const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined; // reset all slices
  }
  return appReducers(state, action);
};

export default rootReducer;
