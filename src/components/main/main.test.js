import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {Main} from './main';
import {promoItem, films} from '../../mocks/testMocks';
import {ALL_GENRES} from '../../const';
import reviews from "../../mocks/reviews";

const mockStore = configureStore([]);

describe(`Main`, () => {
  it(`Main rendered correctly`, () => {
    const store = mockStore({
      currentGenre: ALL_GENRES,
      genres: [...new Set(films.map((film) => film.genre))],
      films,
      reviews,
      promoItem,
    });

    const tree = renderer.create(
        <Provider store={store}>
          <Main
            promoItem={promoItem}
            films={films}
            genres={[...new Set(films.map((film) => film.genre))]}
            currentGenre={ALL_GENRES}
            onChangeGenre={() => {}}
          />
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
