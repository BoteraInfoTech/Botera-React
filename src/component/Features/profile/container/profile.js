import { connect } from "react-redux";
import Profile from "../Profile";

import { getUserDetails } from "../../dashboard/actions/dashboard";
import { deleteUser, updateUser } from "../actions/user";

const mapStateToProps = (state) => ({
  userDetails: state.userDetails,
});

const mapDispatchToProps = (dispatch) => ({
  getUserDetails: () => {
    dispatch(getUserDetails());
  },
  deleteUser: () => {
    dispatch(deleteUser());
  },
  updateUser: (data) => {
    dispatch(updateUser(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
