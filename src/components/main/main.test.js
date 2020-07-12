import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import configureStore from 'redux-mock-store';

import Main from './main';
import NameSpace from '../../reducers/name-space';
import {ALL_GENRES, AuthorizationStatus} from '../../const';
import reviews from '../../mocks/reviews';

const mockStore = configureStore([]);

const promoFilm = {
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
};
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

describe(`Main`, () => {
  it(`Main rendered correctly`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        films,
        genre: ALL_GENRES,
        reviews,
        promoFilm,
        isLoading: false,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <Main
              promoFilm={promoFilm}
            />
          </BrowserRouter>
        </Provider>,
        {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
