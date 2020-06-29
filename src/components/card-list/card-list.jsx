import React from 'react';
import PropTypes from 'prop-types';

import Card from '../card/card';
import withCard from '../../hocs/with-card/with-card';

const CardWrapped = withCard(Card);

const CardList = ({films}) => {
  return (
    <div className="catalog__movies-list">
      {films.map((film) => (
        <CardWrapped
          key={film.id}
          film={film}
        />
      ))}
    </div>
  );
};

CardList.propTypes = {
  films: PropTypes.array.isRequired,
};

export default CardList;
