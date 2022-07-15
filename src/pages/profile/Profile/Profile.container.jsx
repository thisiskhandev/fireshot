/* eslint-disable implicit-arrow-linebreak */
import { connect } from 'react-redux';

import { loadUserStart } from 'src/store/auth/auth.actions';

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  onLoadUserStart: () => dispatch(loadUserStart())
});

const container = connect(mapStateToProps, mapDispatchToProps);

export default container;
