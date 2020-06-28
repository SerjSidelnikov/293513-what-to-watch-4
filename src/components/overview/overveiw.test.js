import React from 'react';
import renderer from 'react-test-renderer';

import Overview from './overview';
import {film} from '../../mocks/testMocks';

describe(`Overview`, () => {
  it(`Overview rendered correctly`, () => {
    const tree = renderer.create(
        <Overview film={film}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
