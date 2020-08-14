import * as React from 'react';
import * as renderer from 'react-test-renderer';

import ButtonShowMore from './button-show-more';

const noop = () => {};

describe(`ButtonShowMore`, () => {
  it(`ButtonShowMore rendered correctly`, () => {
    const tree = renderer.create(
        <ButtonShowMore onShowMore={noop}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
