import * as React from 'react';

interface State {
  isActive: boolean
}

const withActiveItem = (Component) => {
  type P = React.ComponentProps<typeof Component>;

  class WrappedComponent extends React.PureComponent<P, State> {
    constructor(props) {
      super(props);

      this.state = {
        isActive: false,
      };
    }

    _handleActiveChange() {
      this.setState((prevState) => ({
        isActive: !prevState.isActive,
      }));
    }

    render() {
      const {isActive} = this.state;

      return (
        <Component
          {...this.props}
          isActive={isActive}
          onActiveChange={this._handleActiveChange}
        />
      );
    }
  }

  return WrappedComponent;
};

export default withActiveItem;
