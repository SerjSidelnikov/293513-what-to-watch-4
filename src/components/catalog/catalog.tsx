import React from 'react';
import PropTypes from 'prop-types';

import GenreList from '../genre-list/genre-list';
import CardList from '../card-list/card-list';
import ButtonShowMore from '../button-show-more/button-show-more';
import {filmType} from '../../types';

const Catalog = (props) => {
  const {films, genres, activeGenre, onChangeGenre, onShowMore, isMoreFilms} = props;

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <GenreList
        genres={genres}
        activeGenre={activeGenre}
        onChangeGenre={onChangeGenre}
      />

      <CardList films={films}/>

      {isMoreFilms && <ButtonShowMore onShowMore={onShowMore}/>}
    </section>
  );
};

Catalog.propTypes = {
  films: PropTypes.arrayOf(filmType).isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeGenre: PropTypes.string.isRequired,
  onChangeGenre: PropTypes.func.isRequired,
  isMoreFilms: PropTypes.bool.isRequired,
  onShowMore: PropTypes.func.isRequired,
};

export default Catalog;
