import React from 'react';
import PropTypes from 'prop-types';

import Card from '../card/card';
import withCard from '../../hocs/with-card/with-card';
import withVideo from '../../hocs/with-video/with-video';

const CardWrapped = withCard(withVideo(Card));

const CardList = ({films}) => {
  return (
    <div className="catalog__movies-list">
      {films.map((film) => (
        <CardWrapped
          key={film.id}
          id={film.id}
          name={film.name}
          src={film[`preview_video_link`]}
          poster={film[`poster_image`]}
          muted={true}
        />
      ))}
    </div>
  );
};

CardList.propTypes = {
  films: PropTypes.array.isRequired,
};

export default CardList;
