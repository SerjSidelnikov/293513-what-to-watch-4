import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import Main from '../main/main';
import MoviePage from '../movie-page/movie-page';
import Player from '../player/player';
import SignIn from '../sing-in/sign-in';
import AddReview from '../add-review/add-review';
import MyList from '../my-list/my-list';
import PrivateRoute from '../private-route/private-route';
import withVideo from '../../hocs/with-video/with-video';
import withVideoPlayer from '../../hocs/with-video-palyer/with-video-player';
import withAddReview from '../../hocs/with-add-review/with-add-review';
import {getAuthorizationStatus} from '../../reducers/user/selectors';
import {AuthorizationStatus, AppRoute} from '../../const';
import {getIdLoadingFilms, getIdLoadingPromo, getPromoFilm} from '../../reducers/data/selectors';
import {filmType} from '../../types';
import {Operation} from '../../reducers/data/data';

const WrappedPlayer = withVideoPlayer(withVideo(Player));
const WrappedAddReview = withAddReview(AddReview);

const App = (props) => {
  const {authorizationStatus, isLoadingFilms, isLoadingPromo, promoFilm, toggleIsFavorite} = props;
  if (isLoadingFilms || isLoadingPromo) {
    return null;
  }

  return (
    <Router>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <Main
            promoFilm={promoFilm}
            authorizationStatus={authorizationStatus}
            toggleIsFavorite={toggleIsFavorite}
          />
        </Route>
        <Route
          exact
          path={`${AppRoute.FILMS}/:id`}
          render={(routeProps) => {
            return <MoviePage {...routeProps}/>;
          }}
        />
        <PrivateRoute
          exact
          path={`${AppRoute.FILMS}/:id/review`}
          render={(routeProps) => {
            return <WrappedAddReview {...routeProps}/>;
          }}
        />
        <Route exact path={`${AppRoute.PLAYER}/:id`} render={(routeProps) => (
          <WrappedPlayer {...routeProps}/>
        )}/>
        <Route exact path={AppRoute.LOGIN}>
          {authorizationStatus === AuthorizationStatus.AUTH
            ? <Redirect to={AppRoute.ROOT}/>
            : <SignIn/>
          }
        </Route>
        <PrivateRoute
          exact={true}
          path={AppRoute.MY_LIST}
          component={MyList}
        />
      </Switch>
    </Router>
  );
};

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  isLoadingFilms: PropTypes.bool.isRequired,
  isLoadingPromo: PropTypes.bool.isRequired,
  promoFilm: filmType,
  toggleIsFavorite: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  isLoadingFilms: getIdLoadingFilms(state),
  isLoadingPromo: getIdLoadingPromo(state),
  promoFilm: getPromoFilm(state),
});

const mapDispatchToProps = (dispatch) => ({
  toggleIsFavorite: (id, status) => {
    dispatch(Operation.toggleIsFavorite(id, status));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
