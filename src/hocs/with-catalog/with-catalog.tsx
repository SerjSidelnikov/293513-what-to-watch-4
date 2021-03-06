import * as React from 'react';
import {connect} from 'react-redux';
import {Subtract} from 'utility-types';

import {getActiveGenre, getFilteredFilms, getGenres} from '../../reducers/data/selectors';
import {ActionCreator as DataActionCreator} from '../../reducers/data/data';
import {Film} from '../../types';
import {MAX_SHOW_FILM} from '../../const';

interface Props {
  films: Array<Film>,
  genres: Array<string>,
  activeGenre: string,
  onChangeGenre: (genre: string) => void,
}

interface State {
  chunk: number,
}

const withCatalog = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, Props>;

  class WithCatalog extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        chunk: 0,
      };

      this._handleShowMore = this._handleShowMore.bind(this);
    }

    _handleShowMore() {
      this.setState((prevState) => ({
        chunk: prevState.chunk + MAX_SHOW_FILM,
      }));
    }

    render() {
      const {chunk} = this.state;
      const {films, genres, activeGenre, onChangeGenre} = this.props;

      const chunkFilms = films.slice(0, chunk + MAX_SHOW_FILM);

      return (
        <Component
          {...this.props}
          films={chunkFilms}
          genres={genres}
          activeGenre={activeGenre}
          onChageGenre={onChangeGenre}
          onShowMore={this._handleShowMore}
          isMoreFilms={films.length > chunkFilms.length}
        />
      );
    }
  }

  const mapStateToProps = (state) => ({
    films: getFilteredFilms(state),
    genres: getGenres(state),
    activeGenre: getActiveGenre(state),
  });

  const mapDispatchToProps = (dispatch) => ({
    onChangeGenre: (genre) => {
      dispatch(DataActionCreator.changeGenreFilter(genre));
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithCatalog);
};

export default withCatalog;
