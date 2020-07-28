import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {getAuthorizationStatus} from '../../reducers/user/selectors';
import {AuthorizationStatus} from '../../const';

const Header = ({authorizationStatus, children}) => {
  return (
    <header className="page-header movie-card__head">
      <div className="logo">
        <Link to={`/`} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      {children}

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
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  children: PropTypes.node,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export default connect(mapStateToProps)(Header);
