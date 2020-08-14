import * as React from 'react';

import {TabsEnum} from '../../types';

interface State {
  activeTab: TabsEnum,
}

const withTabs = (Component) => {
  type P = React.ComponentProps<typeof Component>;

  class WrappedComponent extends React.PureComponent<P, State> {
    constructor(props) {
      super(props);

      this.state = {
        activeTab: TabsEnum.OVERVIEW,
      };

      this._handleClick = this._handleClick.bind(this);
    }

    _handleClick(tab) {
      this.setState({
        activeTab: tab,
      });
    }

    render() {
      const {activeTab} = this.state;

      return (
        <Component
          {...this.props}
          activeTab={activeTab}
          onClickTab={this._handleClick}
        />
      );
    }
  }

  return WrappedComponent;
};

export default withTabs;
