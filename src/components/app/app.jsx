import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Main from '../main/main';
import MoviePage from '../movie-page/movie-page';
import Player from '../player/player';
import films from '../../mocks/films';
import withVideo from '../../hocs/with-video/with-video';
import withVideoPlayer from '../../hocs/with-video-palyer/with-video-player';

const WrappedPlayer = withVideoPlayer(withVideo(Player));

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={`/`}>
          <Main/>
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
      </Switch>
    </Router>
  );
};

export default App;
