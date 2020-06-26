import React from 'react';
import renderer from 'react-test-renderer';

import Main from './main';
import {promoItem, films} from '../../mocks/testMocks';

describe(`Main`, () => {
  it(`Main rendered correctly`, () => {
    const tree = renderer.create(
        <Main
          promoItem={promoItem}
          films={films}
          onCardTitleClick={() => {}}
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
