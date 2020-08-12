import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import Card from './card';

const Element = () => <div>children</div>;

describe(`Card`, () => {
  it(`Card rendered correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <Card
            id={1}
            name={``}
            onMouseLeave={() => {}}
            onMouseEnter={() => {}}
          >
            <Element/>
          </Card>
        </BrowserRouter>,
        {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
