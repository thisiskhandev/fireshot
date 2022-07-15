/* eslint-disable implicit-arrow-linebreak */
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  auth: state.auth
});

const container = connect(mapStateToProps);

export default container;
