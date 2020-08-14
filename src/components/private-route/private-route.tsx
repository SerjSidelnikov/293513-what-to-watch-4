import * as React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

import {getAuthorizationStatus} from '../../reducers/user/selectors';
import {AppRoute} from '../../const';
import {AuthorizationStatus} from '../../types';

interface Props {
  authorizationStatus: AuthorizationStatus,
}

const PrivateRoute: React.FC<Props> = (props) => {
  if (props.authorizationStatus === AuthorizationStatus.AUTH) {
    return <Route {...props}/>;
  }
  return <Redirect to={AppRoute.LOGIN}/>;
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export default connect(mapStateToProps)(PrivateRoute);
