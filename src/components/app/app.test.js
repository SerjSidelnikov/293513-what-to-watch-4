import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import App from './app';
import {ALL_GENRES} from '../../const';
import {films, promoItem} from '../../mocks/testMocks';
import reviews from "../../mocks/reviews";

const mockStore = configureStore([]);

describe(`App`, () => {
  it(`App rendered correctly`, () => {
    const store = mockStore({
      currentGenre: ALL_GENRES,
      genres: [...new Set(films.map((film) => film.genre))],
      films,
      reviews,
      promoItem,
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App/>
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
