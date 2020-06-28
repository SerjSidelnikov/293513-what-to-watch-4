import React from 'react';

const DELAY = 1000;

const withCard = (Component) => {
  class WrappedComponent extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
      };

      this._handleMouseEnter = this._handleMouseEnter.bind(this);
      this._handleMouseLeave = this._handleMouseLeave.bind(this);
    }

    componentWillUnmount() {
      clearTimeout(this._timer);
    }

    _handleMouseEnter() {
      this._timer = setTimeout(() => {
        this.setState({isPlaying: true});
      }, DELAY);
    }

    _handleMouseLeave() {
      clearTimeout(this._timer);
      this.setState({isPlaying: false});
    }

    render() {
      const {isPlaying} = this.state;

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          onMouseEnter={this._handleMouseEnter}
          onMouseLeave={this._handleMouseLeave}
        />
      );
    }
  }

  return WrappedComponent;
};

export default withCard;
