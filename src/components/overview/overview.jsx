import React from 'react';

import {filmType} from '../../types';
import {ratingFormat, getRatingString} from '../../utils';
import {ACTORS_MAX_LENGTH} from '../../const';

const Overview = ({film}) => {
  const {rating, voiceCount, description, director, actors} = film;

  const ratingString = getRatingString(rating);

  return (
    <>
      <div className="movie-rating">
        <div className="movie-rating__score">{ratingFormat(rating)}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{ratingString}</span>
          <span className="movie-rating__count">{voiceCount} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{description}</p>

        <p className="movie-card__director"><strong>Director: {director}</strong></p>

        <p className="movie-card__starring"><strong>Starring: {actors.slice(0, ACTORS_MAX_LENGTH).join(`, `)} and other</strong></p>
      </div>
    </>
  );
};

Overview.propTypes = {
  film: filmType,
};

export default Overview;
