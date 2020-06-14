import React from 'react';
import renderer from 'react-test-renderer';

import Card from './card';
import data from '../../mocks/data';

describe(`Card`, () => {
  it(`Card render correctly`, () => {
    const tree = renderer.create(
        <Card
          title={data.movies[0]}
          onCardTitleClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
