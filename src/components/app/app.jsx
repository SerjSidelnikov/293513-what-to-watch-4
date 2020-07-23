import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import Main from '../main/main';
import MoviePage from '../movie-page/movie-page';
import Player from '../player/player';
import SignIn from '../sing-in/sign-in';
import AddReview from '../add-review/add-review';
import PrivateRoute from '../private-route/private-route';
import withVideo from '../../hocs/with-video/with-video';
import withVideoPlayer from '../../hocs/with-video-palyer/with-video-player';
import {getAuthorizationStatus} from '../../reducers/user/selectors';
import {AuthorizationStatus} from '../../const';
import {getIdLoadingFilms, getIdLoadingPromo, getPromoFilm} from '../../reducers/data/selectors';
import {filmType} from '../../types';

const WrappedPlayer = withVideoPlayer(withVideo(Player));

const App = (props) => {
  const {authorizationStatus, isLoadingFilms, isLoadingPromo, promoFilm} = props;
  if (isLoadingFilms || isLoadingPromo) {
    return null;
  }

  return (
    <Router>
      <Switch>
        <Route exact path={`/`}>
          <Main promoFilm={promoFilm}/>
        </Route>
        <Route
          exact
          path={`/films/:id`}
          render={(routeProps) => {
            return <MoviePage {...routeProps}/>;
          }}
        />
        <PrivateRoute
          exact
          path={`/films/:id/review`}
          render={(routeProps) => {
            return <AddReview {...routeProps}/>;
          }}
        />
        <Route exact path={`/player/:id`} render={(routeProps) => (
          <WrappedPlayer {...routeProps}/>
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
  isLoadingFilms: PropTypes.bool.isRequired,
  isLoadingPromo: PropTypes.bool.isRequired,
  promoFilm: filmType,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  isLoadingFilms: getIdLoadingFilms(state),
  isLoadingPromo: getIdLoadingPromo(state),
  promoFilm: getPromoFilm(state),
});

export default connect(mapStateToProps)(App);
