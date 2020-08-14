import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {getAuthorizationStatus} from '../../reducers/user/selectors';
import {AppRoute} from '../../const';
import {AuthorizationStatus} from '../../types';

interface Props {
  authorizationStatus: AuthorizationStatus,
}

const UserBlock: React.FC<Props> = ({authorizationStatus}) => {
  return (
    <div className="user-block">
      {
        authorizationStatus === AuthorizationStatus.AUTH
          ? (
            <Link to={AppRoute.MY_LIST} className="user-block__avatar" style={{display: `block`}}>
              <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63"/>
            </Link>
          )
          : <Link to={AppRoute.LOGIN} className="user-block__link">Sign in</Link>
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export default connect(mapStateToProps)(UserBlock);
