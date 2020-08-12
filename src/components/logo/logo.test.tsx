import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';

import Logo from './logo';

describe(`Logo`, () => {
  it(`Logo rendered correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <Logo/>
        </BrowserRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
