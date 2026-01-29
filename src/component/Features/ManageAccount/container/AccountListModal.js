import { connect } from "react-redux";
import AccountListModal from "../AccountListModal";
import {
  connectAccount,
  getConnectedAccounts,
} from "../../../../actions/account";

const mapStateToProps = (state) => ({
  accountReducer: state.accountReducer,
});

const mapDispatchToProps = (dispatch) => ({
  connectAccount: (data) => {
    dispatch(connectAccount(data));
  },
  getConnectedAccounts: () => {
    dispatch(getConnectedAccounts());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountListModal);
