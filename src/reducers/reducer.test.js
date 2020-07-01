import {
  reducer,
  ActionType,
} from './reducer';
import films from '../mocks/films';
import {ALL_GENRES, MAX_SHOW_FILM} from '../const';
import reviews from "../mocks/reviews";

describe(`Test reducer`, () => {
  it(`Should return initial state by default`, () => {
    expect(reducer(undefined, {})).toEqual({
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
      },
    });
  });

  it(`Should change genre filter`, () => {
    expect(reducer({currentGenre: `All genres`}, {
      type: ActionType.CHANGE_GENRE_FILTER,
      payload: `Comedies`
    })).toEqual({
      currentGenre: `Comedies`,
    });
  });

  it(`Should return filtered movies`, () => {
    const mockFilteredMovies = films[0];

    expect(reducer({films}, {
      type: ActionType.GET_FILTERED_FILMS,
      payload: mockFilteredMovies,
    })).toEqual({
      films: mockFilteredMovies,
    });
  });
});
