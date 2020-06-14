import React from 'react';
import renderer from 'react-test-renderer';

import Main from './main';
import data from '../../mocks/data';

describe(`Main`, () => {
  it(`Main render correctly`, () => {
    const {film, movies} = data;

    const tree = renderer.create(
        <Main
          film={film}
          movies={movies}
          onCardTitleClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
