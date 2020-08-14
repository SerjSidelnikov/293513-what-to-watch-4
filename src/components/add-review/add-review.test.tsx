import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import configureStore from 'redux-mock-store';

import AddReview from './add-review';
import NameSpace from '../../reducers/name-space';
import {AuthorizationStatus} from '../../types';

const film = {
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

const noop = () => {};

const mockStore = configureStore([]);

describe(`AddReview`, () => {
  it(`AddReview rendered correctly`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
    });
    const tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <AddReview
              id={film.id}
              film={film}
              statusTransfer={``}
              comment={``}
              rating={1}
              onChange={noop}
              onSubmitReview={noop}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
