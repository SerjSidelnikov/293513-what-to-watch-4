import React from 'react';
import renderer from 'react-test-renderer';

import Tabs from './tabs';
import {film, reviews} from '../../mocks/testMocks';
import {TabsEnum} from '../../const';

describe(`Tabs`, () => {
  it(`Tabs rendered correctly`, () => {
    const tree = renderer.create(
        <Tabs
          film={film}
          reviews={reviews}
          activeTab={TabsEnum.OVERVIEW}
          onClickTab={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
