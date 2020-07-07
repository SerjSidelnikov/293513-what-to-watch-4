import React from 'react';

import {filmType} from '../../types';

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
      const {film} = this.props;
      const {src, poster} = film;
      const {isPlaying} = this.state;

      return (
        <Component
          {...this.props}
          src={src}
          poster={poster}
          isPlaying={isPlaying}
          muted={false}
          load={false}
          onTogglePlaying={this._handleTogglePlaying}
        />
      );
    }
  }

  WithVideoPlayer.propTypes = {
    film: filmType,
  };

  return WithVideoPlayer;
};

export default withVideoPlayer;
