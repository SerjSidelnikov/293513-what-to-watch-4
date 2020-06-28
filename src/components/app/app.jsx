import React from 'react';
import PropTypes from 'prop-types';
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
    const {films} = this.props;

    return (
      <Router>
        <Switch>
          <Route exact path={`/`}>
            {this._renderScreen()}
          </Route>
          <Route exact path={`/movie-page`}>
            <MoviePage
              film={films[0]}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  films: PropTypes.array.isRequired,
};

export default App;
