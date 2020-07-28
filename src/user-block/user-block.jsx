import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {AuthorizationStatus} from '../const';
import {getAuthorizationStatus} from '../reducers/user/selectors';

const UserBlock = ({authorizationStatus}) => {
  return (
    <div className="user-block">
      {
        authorizationStatus === AuthorizationStatus.AUTH
          ? (
            <Link to={`/myList`} className="user-block__avatar" style={{display: `block`}}>
              <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63"/>
            </Link>
          )
          : <Link to={`/login`} className="user-block__link">Sign in</Link>
      }
    </div>
  );
};

UserBlock.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export default connect(mapStateToProps)(UserBlock);
