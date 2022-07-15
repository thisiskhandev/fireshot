import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const AdminRoute = ({
  auth: { isAuthenticated, currentUser },
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && currentUser.role === 'Admin' ? (
          <Component {...props} />
        ) : (
          <Redirect to="/null" />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AdminRoute);
