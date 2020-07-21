import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
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
import {
  getFilms,
  getIdLoadingFilms,
  getIdLoadingPromo,
  getPromoFilm
} from '../../reducers/data/selectors';
import {filmType} from '../../types';
import {Operation as UserOperation} from '../../reducers/user/user';
import {Operation as DataOperation} from '../../reducers/data/data';

const WrappedPlayer = withVideoPlayer(withVideo(Player));

class App extends React.PureComponent {
  componentDidMount() {
    const {checkAuth, loadFilms, loadPromoFilm} = this.props;
    checkAuth();
    loadPromoFilm();
    loadFilms();
  }

  render() {
    let {authorizationStatus, isLoadingFilms, isLoadingPromo, promoFilm, films} = this.props;
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
  }
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  isLoadingFilms: PropTypes.bool.isRequired,
  isLoadingPromo: PropTypes.bool.isRequired,
  promoFilm: filmType,
  films: PropTypes.arrayOf(filmType).isRequired,
  checkAuth: PropTypes.func.isRequired,
  loadFilms: PropTypes.func.isRequired,
  loadPromoFilm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  isLoadingFilms: getIdLoadingFilms(state),
  isLoadingPromo: getIdLoadingPromo(state),
  promoFilm: getPromoFilm(state),
  films: getFilms(state),
});

const mapDispatchToProps = (dispatch) => ({
  checkAuth: () => {
    dispatch(UserOperation.checkAuth());
  },
  loadFilms: () => {
    dispatch(DataOperation.loadFilms());
  },
  loadPromoFilm: () => {
    dispatch(DataOperation.loadPromoFilms());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
