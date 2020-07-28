import {ALL_GENRES} from '../../const';

const initialState = {
  films: [],
  genre: ALL_GENRES,
  promoFilm: {},
  isLoadingFilms: true,
  isLoadingPromo: true,
};

const ActionType = {
  CHANGE_GENRE_FILTER: `CHANGE_GENRE_FILTER`,
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  IS_FAVORITES: `IS_FAVORITES`,
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

  toggleIsFavorite: (film) => ({
    type: ActionType.IS_FAVORITES,
    payload: film,
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
        isLoadingFilms: false,
      });

    case ActionType.LOAD_PROMO_FILM:
      return Object.assign({}, state, {
        promoFilm: action.payload,
        isLoadingPromo: false,
      });

    case ActionType.IS_FAVORITES:
      const films = state.films.filter((it) => it.id !== action.payload.id);
      const promoFilm = state.promoFilm.id === action.payload.id ? action.payload : state.promoFilm;
      return Object.assign({}, state, {
        films: [...films, action.payload],
        promoFilm,
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
      });
  },

  loadPromoFilms: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromoFilms(response.data));
      });
  },

  toggleIsFavorite: (id, status) => (dispatch, getState, api) => {
    return api.post(`/favorite/${id}/${status}`)
      .then((response) => {
        dispatch(ActionCreator.toggleIsFavorite(response.data));
      });
  },
};

export {
  reducer,
  ActionType,
  ActionCreator,
  Operation,
};
