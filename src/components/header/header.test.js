import React from 'react';
import renderer from 'react-test-renderer';

import Header from './header';

describe(`Header`, () => {
  it(`Header rendered correctly`, () => {
    const tree = renderer.create(
        <Header/>,
        {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
