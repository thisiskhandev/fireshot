/* eslint-disable implicit-arrow-linebreak */
import { connect } from 'react-redux';

import { signupStart } from 'src/store/auth/auth.actions';

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  onSignupStart: (formData, found, history) =>
    dispatch(signupStart(formData, found, history))
});
const container = connect(mapStateToProps, mapDispatchToProps);

export default container;
