import {createSelector} from 'reselect';

import NameSpace from '../name-space';

const NAME_SPACE = NameSpace.DATA;

export const getIsLoading = (state) => {
  return state[NAME_SPACE].isLoading;
};

export const getFilms = (state) => {
  return state[NAME_SPACE].films;
};

export const getActiveGenre = (state) => {
  return state[NAME_SPACE].genre;
};

export const getGenres = createSelector(
    getFilms,
    (films) => [`All genres`, ...new Set(films.map((film) => film.genre))]
);

export const getFilteredFilms = createSelector(
    getFilms,
    getActiveGenre,
    (films, activeGenre) => {
      return (activeGenre === `All genres`) ? films : films.filter((film) => film.genre === activeGenre);
    }
);

export const getPromoFilm = (state) => {
  return state[NAME_SPACE].promoFilm;
};
