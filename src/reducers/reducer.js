import films from '../mocks/films';
import reviews from '../mocks/reviews';
import {ALL_GENRES, MAX_SHOW_FILM} from '../const';

const initialState = {
  currentGenre: ALL_GENRES,
  genres: [...new Set(films.map((film) => film.genre))],
  films,
  chunkFilms: [],
  isMoreFilms: films.length > MAX_SHOW_FILM,
  reviews,
  promoItem: {
    title: `The Grand Budapest Hotel`,
    genre: `Drama`,
    releaseDate: 2014,
  }
};

window.state = initialState;

const ActionType = {
  CHANGE_GENRE_FILTER: `CHANGE_GENRE_FILTER`,
  GET_FILTERED_FILMS: `GET_FILTERED_FILMS`,
  LOAD_FILMS: `LOAD_FILMS`,
  SHOW_MORE: `SHOW_MORE`,
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

  loadFilms: () => ({
    type: ActionType.LOAD_FILMS,
  }),

  showMore: () => ({
    type: ActionType.SHOW_MORE,
  }),
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

    case ActionType.LOAD_FILMS:
      return Object.assign({}, state, {
        chunkFilms: state.films.slice(0, MAX_SHOW_FILM),
        isMoreFilms: state.films.length > MAX_SHOW_FILM,
      });

    case ActionType.SHOW_MORE:
      const newChunk = state.films.slice(state.chunkFilms.length, state.chunkFilms.length + MAX_SHOW_FILM);
      return Object.assign({}, state, {
        chunkFilms: state.chunkFilms.concat(newChunk),
        isMoreFilms: newChunk.length === MAX_SHOW_FILM,
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
