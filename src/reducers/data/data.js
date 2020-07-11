// import films from '../mocks/films';
// import reviews from '../../mocks/reviews';
import {ALL_GENRES} from '../../const';

const initialState = {
  films: [],
  genre: ALL_GENRES,
  // reviews,
  promoFilm: {},
  isLoading: true,
};

const ActionType = {
  CHANGE_GENRE_FILTER: `CHANGE_GENRE_FILTER`,
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  LOADING_PROGRESS: `LOADING_PROGRESS`,
  LOADING_SUCCESS: `LOADING_SUCCESS`,
};

const ActionCreator = {
  changeGenreFilter: (genre) => ({
    type: ActionType.CHANGE_GENRE_FILTER,
    payload: genre,
  }),

  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films,
  }),

  loadPromoFilms: (film) => ({
    type: ActionType.LOAD_PROMO_FILM,
    payload: film,
  }),

  loadingProgress: () => ({
    type: ActionType.LOADING_PROGRESS,
  }),

  loadingSuccess: () => ({
    type: ActionType.LOADING_SUCCESS,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE_FILTER:
      return Object.assign({}, state, {
        genre: action.payload,
      });

    case ActionType.LOAD_FILMS:
      return Object.assign({}, state, {
        films: action.payload,
      });

    case ActionType.LOAD_PROMO_FILM:
      return Object.assign({}, state, {
        promoFilm: action.payload,
      });

    case ActionType.LOADING_PROGRESS:
      return Object.assign({}, state, {
        isLoading: true,
      });

    case ActionType.LOADING_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
      });

    default:
      return state;
  }
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadFilms(response.data));
      })
      .then(() => dispatch(ActionCreator.loadingSuccess()));
  },

  loadPromoFilms: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.loadingProgress());
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromoFilms(response.data));
      });
  },
};

export {
  reducer,
  ActionType,
  ActionCreator,
  Operation,
};
