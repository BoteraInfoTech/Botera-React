import { connect } from "react-redux";
import AccountManagePage from "../AccountManagePage";
import { getConnectedAccounts } from "../../../../actions/account";

const mapStateToProps = (state) => ({
  accountReducer: state.accountReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getConnectedAccounts: (params) => {
    dispatch(getConnectedAccounts(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountManagePage);
