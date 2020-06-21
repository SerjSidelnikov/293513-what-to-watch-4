import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Main from '../main/main';
import MoviePage from '../movie-page/movie-page';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeMovie: null,
    };

    this._handleSetActiveMovie = this._handleSetActiveMovie.bind(this);
  }

  _handleSetActiveMovie(movie) {
    window.scrollTo(0, 0);
    this.setState({
      activeMovie: movie,
    });
  }

  _renderScreen() {
    const {activeMovie} = this.state;
    if (activeMovie) {
      return <MoviePage movie={activeMovie}/>;
    }
    return (
      <Main
        {...this.props}
        onCardTitleClick={this._handleSetActiveMovie}
      />
    );
  }

  render() {
    const {activeMovie} = this.state;

    return (
      <Router>
        <Switch>
          <Route exact path={`/`}>
            {this._renderScreen()}
          </Route>
          <Route exact path={`/movie-page`}>
            <MoviePage
              movie={activeMovie}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
