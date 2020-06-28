import React from 'react';
import renderer from 'react-test-renderer';

import Review from './review';
import {review} from '../../mocks/testMocks';

describe(`Review`, () => {
  it(`Review rendered correctly`, () => {
    const tree = renderer.create(
        <Review review={review}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
