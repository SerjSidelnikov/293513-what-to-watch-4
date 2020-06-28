import React from 'react';
import renderer from 'react-test-renderer';

import MoviePage from './movie-page';
import {film, reviews} from '../../mocks/testMocks';

describe(`MoviePage`, () => {
  it(`MoviePage rendered correctly`, () => {
    const tree = renderer.create(
        <MoviePage film={film} reviews={reviews}/>,
        {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
