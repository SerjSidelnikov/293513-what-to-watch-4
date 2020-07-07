import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
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
      isMoreFilms: true,
      reviews,
      promoItem,
    });

    const tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <Main
              promoItem={promoItem}
              films={films}
              isMoreFilms={true}
              genres={[...new Set(films.map((film) => film.genre))]}
              currentGenre={ALL_GENRES}
              onChangeGenre={() => {}}
              onLoadFilms={() => {}}
              onShowMore={() => {}}
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
