import React, { Component } from 'react';

import Friends from './Friends';
import Routes from '../../config/routes';

class FriendsContainer extends Component {


  onTargetPress(target) {

    const { setTarget, navigator } = this.props;

    setTarget(target); // Redux
    

    navigator.push(Routes.getLaunchRoute())

  }

  render() {

    return (
      <Friends {...this.props} {...this.state} onTargetPress={this.onTargetPress} />
    );

  }
}

export default FriendsContainer;
