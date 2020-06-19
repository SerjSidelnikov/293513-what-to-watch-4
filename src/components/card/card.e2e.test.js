import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Card from './card';
import {film} from '../../mocks/testMocks';

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Card`, () => {
  it(`Should card title be clicked`, () => {
    const handleCardTitleClick = jest.fn();
    const handleActiveFilm = jest.fn();

    const main = shallow(
        <Card
          film={film}
          onActiveFilm={handleActiveFilm}
          onCardTitleClick={handleCardTitleClick}
        />
    );

    const cardTitle = main.find(`.small-movie-card__title`);
    cardTitle.simulate(`click`);

    expect(handleCardTitleClick).toHaveBeenCalledTimes(1);
  });

  it(`On hover the card, the correct information gets into the callback function: an active card with a movie.`, () => {
    const handleCardTitleClick = jest.fn();
    const handleActiveFilm = jest.fn();

    const card = mount(
        <Card
          film={film}
          onActiveFilm={handleActiveFilm}
          onCardTitleClick={handleCardTitleClick}
        />
    );

    const cardItem = card.find(`.small-movie-card`);
    cardItem.simulate(`mouseenter`);
    expect(handleActiveFilm.mock.calls[0][0]).toMatchObject(film);
  });
});
