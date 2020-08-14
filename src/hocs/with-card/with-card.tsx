import * as React from 'react';
import {Subtract} from 'utility-types';

const DELAY = 1000;

interface Props {
  isPlaying: boolean,
}

interface State {
  isPlayingReal: boolean,
}

const withCard = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, Props>;

  class WrappedComponent extends React.PureComponent<T, State> {
    private timer: NodeJS.Timeout;

    constructor(props) {
      super(props);

      this.state = {
        isPlayingReal: false,
      };

      this._handleMouseEnter = this._handleMouseEnter.bind(this);
      this._handleMouseLeave = this._handleMouseLeave.bind(this);
    }

    componentWillUnmount() {
      clearTimeout(this.timer);
    }

    _handleMouseEnter() {
      this.timer = setTimeout(() => {
        this.setState({isPlayingReal: true});
      }, DELAY);
    }

    _handleMouseLeave() {
      clearTimeout(this.timer);
      this.setState({isPlayingReal: false});
    }

    render() {
      const {isPlayingReal} = this.state;

      return (
        <Component
          {...this.props}
          isPlaying={isPlayingReal}
          load={true}
          loop={true}
          onMouseEnter={this._handleMouseEnter}
          onMouseLeave={this._handleMouseLeave}
        />
      );
    }
  }

  return WrappedComponent;
};

export default withCard;
