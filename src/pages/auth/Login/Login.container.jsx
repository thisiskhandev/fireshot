/* eslint-disable implicit-arrow-linebreak */
import { connect } from 'react-redux';

import { signinStart, clearErrorLog } from 'src/store/auth/auth.actions';

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  onSigninStart: (formData, history) =>
    dispatch(signinStart(formData, history)),
  onClearErrorLog: () => dispatch(clearErrorLog())
});

const container = connect(mapStateToProps, mapDispatchToProps);

export default container;
