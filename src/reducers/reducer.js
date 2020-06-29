import films from '../mocks/films';
import reviews from '../mocks/reviews';
import {ALL_GENRES} from '../const';

const initialState = {
  currentGenre: ALL_GENRES,
  genres: [...new Set(films.map((film) => film.genre))],
  films,
  reviews,
  promoItem: {
    title: `The Grand Budapest Hotel`,
    genre: `Drama`,
    releaseDate: 2014,
  }
};

const ActionType = {
  CHANGE_GENRE_FILTER: `CHANGE_GENRE_FILTER`,
  GET_FILTERED_FILMS: `GET_FILTERED_FILMS`,
};

const ActionCreator = {
  changeGenreFilter: (genre) => ({
    type: ActionType.CHANGE_GENRE_FILTER,
    payload: genre,
  }),

  getFilteredFilms: (genre) => {
    let filteredFilms = initialState.films;

    if (genre !== ALL_GENRES) {
      filteredFilms = initialState.films.filter((movie) => movie.genre === genre);
    }

    return {
      type: ActionType.GET_FILTERED_FILMS,
      payload: filteredFilms,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE_FILTER:
      return Object.assign({}, state, {
        currentGenre: action.payload,
      });

    case ActionType.GET_FILTERED_FILMS:
      return Object.assign({}, state, {
        films: action.payload,
      });

    default:
      return state;
  }
};

export {
  reducer,
  ActionType,
  ActionCreator,
};
