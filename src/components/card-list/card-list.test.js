import React from 'react';
import renderer from 'react-test-renderer';

import CardList from './card-list';
import {films} from '../../mocks/testMocks';

describe(`CardList`, () => {
  it(`CardList rendered correctly`, () => {
    const tree = renderer.create(
        <CardList
          films={films}
          onCardTitleClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
