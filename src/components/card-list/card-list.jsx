import React from 'react';
import PropTypes from 'prop-types';

import Card from '../card/card';
import withCard from '../../hocs/with-card/with-card';

const CardWrapped = withCard(Card);

const CardList = ({films, onCardTitleClick}) => {
  return (
    <div className="catalog__movies-list">
      {films.map((film) => (
        <CardWrapped
          key={film.id}
          film={film}
          onCardTitleClick={onCardTitleClick}
        />
      ))}
    </div>
  );
};

CardList.propTypes = {
  films: PropTypes.array.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
};

export default CardList;
