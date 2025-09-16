import { connect } from "react-redux";
import SignUp from "../SignUp";

import { registerUser } from "../../actions/auth";

const mapStateToProps = (state) => ({
  authDetails: state.authReducer,
});

const mapDispatchToProps = (dispatch) => ({
  registerUser: (data) => {
    dispatch(registerUser(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
