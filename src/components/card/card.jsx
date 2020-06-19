import React from 'react';
import PropTypes from 'prop-types';

const Card = ({film, onActiveFilm, onCardTitleClick}) => {
  const {title, poster} = film;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => onActiveFilm(film)}
    >
      <div className="small-movie-card__image">
        <img
          src={poster}
          alt={title}
          width="280"
          height="175"
        />
      </div>
      <h3
        className="small-movie-card__title"
        onClick={onCardTitleClick}
      >
        <a
          className="small-movie-card__link"
          href="movie-page.html"
        >{title}</a>
      </h3>
    </article>
  );
};

Card.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }).isRequired,
  onActiveFilm: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
};

export default Card;
