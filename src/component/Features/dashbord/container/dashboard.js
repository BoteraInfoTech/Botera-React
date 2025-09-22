import { connect } from "react-redux";
import Dashboard from "../Dashboard";

import {
  getUserDetails,
  getTaskDetails,
  getDashboardDetails,
  getPerformanceData,
  getRecentConversations,
} from "../actions/dashboard";

const mapStateToProps = (state) => ({
  userDetails: state.userDetails,
  dashboardTask: state.dashboardTask,
  dashboardDetails: state.dashboardDetails,
  dashboardPerformance: state.dashboardPerformance,
  dashboardConversation: state.dashboardConversation,
});

const mapDispatchToProps = (dispatch) => ({
  getUserDetails: () => {
    dispatch(getUserDetails());
  },
  getTaskDetails: () => {
    dispatch(getTaskDetails());
  },
  getDashboardDetails: () => {
    dispatch(getDashboardDetails());
  },
  getPerformanceData: () => {
    dispatch(getPerformanceData());
  },
  getRecentConversations: () => {
    dispatch(getRecentConversations());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
