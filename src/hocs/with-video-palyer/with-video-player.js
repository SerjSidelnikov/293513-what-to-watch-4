import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {filmType} from '../../types';
import {getFilms} from '../../reducers/data/selectors';

const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
      };

      this._handleTogglePlaying = this._handleTogglePlaying.bind(this);
    }

    _handleTogglePlaying() {
      this.setState((prevState) => ({
        isPlaying: !prevState.isPlaying,
      }));
    }

    render() {
      const {films, match} = this.props;
      const id = parseInt(match.params.id, 10);
      const film = films.find((it) => it.id === id);
      const {name, 'video_link': src, 'preview_image': poster, 'run_time': time} = film;
      const {isPlaying} = this.state;

      return (
        <Component
          {...this.props}
          src={src}
          poster={poster}
          isPlaying={isPlaying}
          muted={false}
          load={false}
          loop={false}
          time={time}
          name={name}
          onTogglePlaying={this._handleTogglePlaying}
        />
      );
    }
  }

  WithVideoPlayer.propTypes = {
    films: PropTypes.arrayOf(filmType).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }).isRequired
    }).isRequired,
  };

  const mapStateToProps = (state) => ({
    films: getFilms(state),
  });

  return connect(mapStateToProps)(WithVideoPlayer);
};

export default withVideoPlayer;
