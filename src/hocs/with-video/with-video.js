import React from 'react';
import PropTypes from 'prop-types';

const withVideo = (Component) => {
  class WithVideo extends React.PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = React.createRef();

      this.state = {
        isLoading: true,
        isPlaying: props.isPlaying,
        progress: 0,
      };

      this._handleChangeFullScreen = this._handleChangeFullScreen.bind(this);
    }

    componentDidMount() {
      const {src, poster, muted} = this.props;
      const video = this._videoRef.current;

      video.src = src;
      video.poster = poster;
      video.muted = muted;

      video.oncanplaythrough = () => {
        this.setState({isLoading: false});
      };

      video.onplay = () => {
        this.setState({isPlaying: true});
      };

      video.onpause = () => {
        this.setState({isPlaying: false});
        if (this.props.load) {
          video.load();
        }
      };

      video.ontimeupdate = () => {
        this.setState({
          progress: Math.floor(video.currentTime),
        });
      };
    }

    componentDidUpdate() {
      const video = this._videoRef.current;

      if (this.props.isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.src = ``;
      video.oncanplaythrough = null;
      video.onplay = null;
      video.onpause = null;
      video.ontimeupdate = null;
    }

    _handleChangeFullScreen() {
      this._videoRef.current.requestFullscreen();
    }

    render() {
      const {progress} = this.state;

      return (
        <Component
          {...this.props}
          progress={progress}
          onChangeFullScreen={this._handleChangeFullScreen}
        >
          <video
            ref={this._videoRef}
            width="100%"
            height="100%"
            preload="none"
            autoPlay={false}
          />
        </Component>
      );
    }
  }

  WithVideo.propTypes = {
    src: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    muted: PropTypes.bool.isRequired,
    load: PropTypes.bool.isRequired,
  };

  return WithVideo;
};

export default withVideo;
