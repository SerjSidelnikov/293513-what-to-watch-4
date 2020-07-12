import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Main from '../main/main';
import MoviePage from '../movie-page/movie-page';
import Player from '../player/player';
import SignIn from '../sing-in/sign-in';
import films from '../../mocks/films';
import withVideo from '../../hocs/with-video/with-video';
import withVideoPlayer from '../../hocs/with-video-palyer/with-video-player';
import {getAuthorizationStatus} from '../../reducers/user/selectors';
import {AuthorizationStatus} from '../../const';
import {getIsLoading, getPromoFilm} from '../../reducers/data/selectors';
import {filmType} from '../../types';

const WrappedPlayer = withVideoPlayer(withVideo(Player));

const App = ({authorizationStatus, isLoading, promoFilm}) => {
  return (!isLoading &&
    <Router>
      <Switch>
        <Route exact path={`/`}>
          <Main promoFilm={promoFilm}/>
        </Route>
        <Route
          exact
          path={`/movie-page/:id`}
          render={(routeProps) => (
            <MoviePage {...routeProps}/>
          )}
        />
        <Route exact path={`/player`} render={(routeProps) => (
          <WrappedPlayer {...routeProps} film={films[0]}/>
        )}/>
        <Route exact path={`/login`}>
          {authorizationStatus === AuthorizationStatus.AUTH
            ? <Redirect to={`/`}/>
            : <SignIn/>
          }
        </Route>
      </Switch>
    </Router>
  );
};

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  promoFilm: filmType,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  isLoading: getIsLoading(state),
  promoFilm: getPromoFilm(state),
});

export default connect(mapStateToProps)(App);
