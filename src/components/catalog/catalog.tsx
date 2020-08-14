import * as React from 'react';

import GenreList from '../genre-list/genre-list';
import CardList from '../card-list/card-list';
import ButtonShowMore from '../button-show-more/button-show-more';
import {Film} from '../../types';

interface Props {
  films: Array<Film>,
  genres: Array<string>,
  activeGenre: string,
  onChangeGenre: () => void,
  onShowMore: () => void,
  isMoreFilms: boolean,
}

const Catalog: React.FC<Props> = (props) => {
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

export default Catalog;
