import React from 'react';
import PropTypes from 'prop-types';

import VideoPlayer from '../video-player/video-player';

class Card extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };

    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
  }

  _handleMouseEnter() {
    this._timer = setTimeout(() => {
      this.setState({isPlaying: true});
    }, 1000);
  }

  _handleMouseLeave() {
    clearTimeout(this._timer);
    this.setState({isPlaying: false});
  }

  render() {
    const {isPlaying} = this.state;
    const {film, onCardTitleClick} = this.props;
    const {name, preview, poster} = film;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
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
          >{name}</a>
        </h3>
      </article>
    );
  }
}

Card.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    promo: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
  }).isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
};

export default Card;
