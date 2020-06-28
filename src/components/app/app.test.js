import React from 'react';
import renderer from 'react-test-renderer';

import App from './app';
import {promoItem, films, reviews} from '../../mocks/testMocks';

describe(`App`, () => {
  it(`App rendered correctly`, () => {
    const tree = renderer.create(
        <App
          promoItem={promoItem}
          films={films}
          reviews={reviews}
        />,
        {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
