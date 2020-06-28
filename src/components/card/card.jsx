import React from 'react';
import PropTypes from 'prop-types';

import VideoPlayer from '../video-player/video-player';
import {filmType} from '../../types';

const Card = ({film, onCardTitleClick, onMouseEnter, onMouseLeave, isPlaying}) => {
  const {title, preview, poster} = film;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => onCardTitleClick(film)}
    >
      <div className="small-movie-card__image">
        <VideoPlayer
          src={preview}
          poster={poster}
          isPlaying={isPlaying}
          muted={true}
        />
      </div>
      <h3 className="small-movie-card__title">
        <a
          className="small-movie-card__link"
          href="#"
        >{title}</a>
      </h3>
    </article>
  );
};

Card.propTypes = {
  film: filmType,
  onCardTitleClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default Card;
