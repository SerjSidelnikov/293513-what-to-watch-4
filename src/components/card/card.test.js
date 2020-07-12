import React from 'react';
import renderer from 'react-test-renderer';

import Card from './card';

const Element = () => <div>children</div>;

describe(`Card`, () => {
  it(`Card rendered correctly`, () => {
    const tree = renderer.create(
        <Card
          name={``}
          onMouseLeave={() => {}}
          onMouseEnter={() => {}}
        >
          <Element/>
        </Card>,
        {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
