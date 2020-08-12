import React from 'react';

import {TabsEnum} from '../../const';

const withTabs = (Component) => {
  class WrappedComponent extends React.PureComponent {
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
