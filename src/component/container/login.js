import { connect } from "react-redux";
import login from "../Login";

import { loginAction } from "../../actions/auth";

const mapStateToProps = (state) => ({
  authDetails: state.authReducer,
});

const mapDispatchToProps = (dispatch) => ({
  loginAction: (data) => {
    dispatch(loginAction(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(login);
