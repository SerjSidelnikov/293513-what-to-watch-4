import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {MAX_SHOW_FILM} from '../../const';
import {getActiveGenre, getFilteredFilms, getGenres} from '../../reducers/data/selectors';
import {ActionCreator as DataActionCreator} from '../../reducers/data/data';
import {filmType} from '../../types';

const withCatalog = (Component) => {
  class WithCatalog extends React.PureComponent {
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

  WithCatalog.propTypes = {
    films: PropTypes.arrayOf(filmType).isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeGenre: PropTypes.string.isRequired,
    onChangeGenre: PropTypes.func.isRequired,
  };

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
