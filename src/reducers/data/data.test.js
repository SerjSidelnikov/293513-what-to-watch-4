import MockAdapter from 'axios-mock-adapter';
import {createApi} from '../../api';

import {reducer, ActionType, Operation} from './data';
import {ALL_GENRES} from '../../const';

const api = createApi(() => {});

const films = [
  {
    "name": `Once Upon a Time in America`,
    "poster_image": `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Once_Upon_a_Time_in_America.jpg`,
    "preview_image": `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/Once_Upon_a_Time_in_America.jpg`,
    "background_image": `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/ones_upon_a_time_in_america.jpg`,
    "background_color": `#CBAC79`,
    "description": `A former Prohibition-era Jewish gangster returns to the Lower East Side of Manhattan over thirty years later, where he once again must confront the ghosts and regrets of his old life.`,
    "rating": 9.9,
    "scores_count": 276395,
    "director": `Sergio Leone`,
    "starring": [
      `Robert De Niro`,
      `James Woods`,
      `Elizabeth McGovern`
    ],
    "run_time": 229,
    "genre": `Crime`,
    "released": 1984,
    "id": 1,
    "is_favorite": false,
    "video_link": `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
    "preview_video_link": `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
  {
    "name": `No Country for Old Men`,
    "poster_image": `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/No_Country_for_Old_Men.jpg`,
    "preview_image": `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/no-country-for-old-men.jpg`,
    "background_image": `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/No_Country_for_Old_Men.jpg`,
    "background_color": `#BDAD8F`,
    "description": `Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande.`,
    "rating": 4.1,
    "scores_count": 764976,
    "director": `Ethan Coen`,
    "starring": [
      `Tommy Lee Jones`,
      `Javier Bardem`,
      `Josh Brolin`
    ],
    "run_time": 122,
    "genre": `Crime`,
    "released": 2007,
    "id": 2,
    "is_favorite": false,
    "video_link": `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
    "preview_video_link": `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  },
];

describe(`Data reducer work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      films: [],
      genre: ALL_GENRES,
      promoFilm: {},
      favoriteFilms: [],
      isLoadingFilms: true,
      isLoadingPromo: true,
    });
  });

  it(`Reducer should update films by load films`, () => {
    expect(reducer({
      films: [],
      isLoadingFilms: true,
    }, {
      type: ActionType.LOAD_FILMS,
      payload: films,
    })).toEqual({
      films,
      isLoadingFilms: false,
    });
  });

  it(`Reducer should update promoFilm by load promo movie`, () => {
    expect(reducer({
      promoFilm: {},
      isLoadingPromo: true,
    }, {
      type: ActionType.LOAD_PROMO_FILM,
      payload: films[0],
    })).toEqual({
      promoFilm: films[0],
      isLoadingPromo: false,
    });
  });

  it(`Reducer should update favoriteFilms by load favorite movies`, () => {
    expect(reducer({
      favoriteFilms: [],
    }, {
      type: ActionType.LOAD_FAVORITE_FILMS,
      payload: films,
    })).toEqual({
      favoriteFilms: films,
    });
  });

  it(`Should change genre filter`, () => {
    expect(reducer({
      genre: ALL_GENRES,
    }, {
      type: ActionType.CHANGE_GENRE_FILTER,
      payload: `Comedies`
    })).toEqual({
      genre: `Comedies`,
    });
  });

  it(`Should make a correct API GET call to /films`, () => {
    const dispatch = jest.fn();
    const apiMock = new MockAdapter(api);
    const filmsLoader = Operation.loadFilms();

    apiMock
      .onGet(`/films`)
      .reply(200, [{fake: true}]);

    return filmsLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FILMS,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API GET call to /films/promo`, () => {
    const dispatch = jest.fn();
    const apiMock = new MockAdapter(api);
    const promoFilmsLoader = Operation.loadPromoFilms();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, [{fake: true}]);

    return promoFilmsLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO_FILM,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API GET call to /favorite`, () => {
    const dispatch = jest.fn();
    const apiMock = new MockAdapter(api);
    const favoriteFilmsLoader = Operation.loadFavoriteFilms();

    apiMock
      .onGet(`/favorite`)
      .reply(200, [{fake: true}]);

    return favoriteFilmsLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITE_FILMS,
          payload: [{fake: true}],
        });
      });
  });
});
