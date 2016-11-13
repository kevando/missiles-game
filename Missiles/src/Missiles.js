
import React, { Component } from 'react'
import {
  ListView,
  NetInfo,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as authActions from './actions/auth';
import * as appActions from './actions/app'; //

import LoggedOut from './layouts/LoggedOut';
import LoggedIn from './layouts/LoggedIn';
import Loading from './components/Loading';


class Missiles extends Component {

  componentWillMount() {
    const { appActions, connectedRef } = this.props;
    // Dispatch a Firebase action to set the connection status
    appActions.checkConnection(connectedRef);
  }

  componentDidMount () {
    const { authActions } = this.props;
    // This listener determines whether user is logged in or not
    authActions.listenForAuthChanges();
  }


  render() {
    const { connected, user } = this.props;

    if (!connected) {
      return <Loading />;

    } else if (user.uid) {
      return <LoggedIn />;

    } else {
      return <LoggedOut />;
    }
  }

}



function mapStateToProps(state) {
  return {
    connected: state.app.connected,
    user: state.user,
    connectedRef: state.firebase.connectedRef
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Missiles)
