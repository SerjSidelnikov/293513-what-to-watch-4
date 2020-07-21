import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

import {getAuthorizationStatus} from '../../reducers/user/selectors';
import {AuthorizationStatus} from '../../const';

const PrivateRoute = (props) => {
  if (props.authorizationStatus === AuthorizationStatus.AUTH) {
    return <Route {...props}/>;
  }
  return <Redirect to={`/login`}/>;
};

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export default connect(mapStateToProps)(PrivateRoute);
