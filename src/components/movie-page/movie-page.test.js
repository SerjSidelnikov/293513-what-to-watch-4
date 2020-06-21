import React from 'react';
import renderer from 'react-test-renderer';

import MoviePage from './movie-page';
import {film} from '../../mocks/testMocks';

describe(`MoviePage`, () => {
  it(`MoviePage rendered correctly`, () => {
    const tree = renderer.create(
        <MoviePage movie={film}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
