import React from 'react';
import PropTypes from 'prop-types';

const Card = ({film, onActiveFilm, onCardTitleClick}) => {
  const {name, thumbnail} = film;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => onActiveFilm(film)}
      onClick={() => onCardTitleClick(film)}
    >
      <div className="small-movie-card__image">
        <img
          src={thumbnail}
          alt={name}
          width="280"
          height="175"
        />
      </div>
      <h3 className="small-movie-card__title">
        <a
          className="small-movie-card__link"
          href="#"
        >{name}</a>
      </h3>
    </article>
  );
};

Card.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    promo: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }).isRequired,
  onActiveFilm: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
};

export default Card;
