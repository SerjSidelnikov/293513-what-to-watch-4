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
        duration: 0,
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
        this.setState({
          isLoading: false,
          duration: video.duration,
        });
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
        const {loop} = this.props;
        const current = Math.floor(video.currentTime);
        const duration = Math.floor(video.duration);

        this.setState({
          progress: current,
        });

        if (!loop && (current === duration)) {
          this.setState({
            isPlaying: false,
          });
        }
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
      if (this._videoRef.current.requestFullscreen) {
        this._videoRef.current.requestFullscreen();
      } else {
        this._videoRef.current.webkitEnterFullScreen();
      }
    }

    render() {
      const {progress, duration} = this.state;

      return (
        <Component
          {...this.props}
          progress={progress}
          duration={duration}
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
    loop: PropTypes.bool.isRequired,
  };

  return WithVideo;
};

export default withVideo;
