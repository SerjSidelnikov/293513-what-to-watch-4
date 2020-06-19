import React from 'react';
import renderer from 'react-test-renderer';

import Card from './card';
import {film} from '../../mocks/testMocks';

describe(`Card`, () => {
  it(`Card rendered correctly`, () => {
    const tree = renderer.create(
        <Card
          film={film}
          onActiveFilm={() => {}}
          onCardTitleClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
