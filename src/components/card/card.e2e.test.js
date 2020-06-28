import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Card from './card';
import {film} from '../../mocks/testMocks';

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Card`, () => {
  it(`Should card title be clicked`, () => {
    const handleCardTitleClick = jest.fn();

    const main = shallow(
        <Card
          film={film}
          onCardTitleClick={handleCardTitleClick}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
          isPlaying={false}
        />
    );

    const cardTitle = main.find(`.small-movie-card`);
    cardTitle.simulate(`click`, {preventDefault: () => {}});

    expect(handleCardTitleClick).toHaveBeenCalledTimes(1);
  });
});
