import * as React from 'react';
import {connect} from 'react-redux';
import {Subtract} from 'utility-types';

import {getFilms} from '../../reducers/data/selectors';
import {Film} from '../../types';

interface Props {
  films: Array<Film>,
  match: {
    params: {
      id: string,
    }
  },
}

interface State {
  isPlaying: boolean,
}

const withVideoPlayer = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, Props>;

  class WithVideoPlayer extends React.PureComponent<T, State> {
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

  const mapStateToProps = (state) => ({
    films: getFilms(state),
  });

  return connect(mapStateToProps)(WithVideoPlayer);
};

export default withVideoPlayer;
