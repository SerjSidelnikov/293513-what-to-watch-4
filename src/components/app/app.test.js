import React from 'react';
import renderer from 'react-test-renderer';

import App from './app';
import data from '../../mocks/data';

describe(`App`, () => {
  it(`App renders correctly`, () => {
    const tree = renderer.create(
        <App
          {...data}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
