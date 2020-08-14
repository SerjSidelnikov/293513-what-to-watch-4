import * as React from 'react';
import {Subtract} from 'utility-types';

interface Props {
  src: string,
  poster: string,
  muted: boolean,
  load: boolean,
  loop: boolean,
  isPlaying: boolean,
}

interface State {
  isLoading: boolean,
  isPlayingReal: boolean,
  progress: number,
  duration: number,
}

const withVideo = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, Props>;

  class WithVideo extends React.PureComponent<T, State> {
    private videoRef: React.RefObject<HTMLVideoElement>;

    constructor(props) {
      super(props);

      this.videoRef = React.createRef();

      this.state = {
        isLoading: true,
        isPlayingReal: props.isPlaying,
        progress: 0,
        duration: 0,
      };

      this._handleChangeFullScreen = this._handleChangeFullScreen.bind(this);
    }

    componentDidMount() {
      const {src, poster, muted} = this.props;
      const video = this.videoRef.current;

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
        this.setState({isPlayingReal: true});
      };

      video.onpause = () => {
        this.setState({isPlayingReal: false});
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
            isPlayingReal: false,
          });
        }
      };
    }

    componentDidUpdate() {
      const video = this.videoRef.current;

      if (this.props.isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    componentWillUnmount() {
      const video = this.videoRef.current;

      video.src = ``;
      video.oncanplaythrough = null;
      video.onplay = null;
      video.onpause = null;
      video.ontimeupdate = null;
    }

    _handleChangeFullScreen() {
      if (this.videoRef.current.requestFullscreen) {
        this.videoRef.current.requestFullscreen();
      } else {
        // this.videoRef.current.webkitEnterFullScreen();
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
            ref={this.videoRef}
            width="100%"
            height="100%"
            preload="none"
            autoPlay={false}
          />
        </Component>
      );
    }
  }

  return WithVideo;
};

export default withVideo;
