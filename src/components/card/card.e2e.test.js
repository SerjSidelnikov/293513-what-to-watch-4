import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Card from './card';
import data from '../../mocks/data';

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Card`, () => {
  it(`Should card title be clicked`, () => {
    const cardTitleHandler = jest.fn();

    const main = shallow(
        <Card
          title={data.movies[0]}
          onCardTitleClick={cardTitleHandler}
        />
    );

    const cardTitle = main.find(`.small-movie-card__title`);
    cardTitle.simulate(`click`);

    expect(cardTitleHandler).toHaveBeenCalledTimes(1);
  });
});
