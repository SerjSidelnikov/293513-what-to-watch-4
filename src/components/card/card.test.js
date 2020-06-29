import React from 'react';
import renderer from 'react-test-renderer';

import Card from './card';
import {film} from '../../mocks/testMocks';

describe(`Card`, () => {
  it(`Card rendered correctly`, () => {
    const tree = renderer.create(
        <Card
          film={film}
          onMouseLeave={() => {}}
          onMouseEnter={() => {}}
          isPlaying={false}
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
