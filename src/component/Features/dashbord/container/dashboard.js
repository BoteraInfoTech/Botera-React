import { connect } from "react-redux";
import Dashboard from "../Dashboard";

import { getUserDetails } from "../actions/dashboard";

const mapStateToProps = (state) => ({
  userDetails: state.userDetails,
});

const mapDispatchToProps = (dispatch) => ({
  getUserDetails: (data) => {
    dispatch(getUserDetails(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
