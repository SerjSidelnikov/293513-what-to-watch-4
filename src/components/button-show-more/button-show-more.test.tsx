import React from 'react';
import renderer from 'react-test-renderer';

import ButtonShowMore from './button-show-more';

describe(`ButtonShowMore`, () => {
  it(`ButtonShowMore rendered correctly`, () => {
    const tree = renderer.create(
        <ButtonShowMore onShowMore={() => {}}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
