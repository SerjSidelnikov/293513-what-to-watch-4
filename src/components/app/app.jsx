import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Main from '../main/main';
import MoviePage from '../movie-page/movie-page';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={`/`}>
          <Main/>
        </Route>
        <Route exact path={`/movie-page`}>
          <MoviePage/>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
