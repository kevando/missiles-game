
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

import {
  WeaponsActions,
} from './actions';

import * as appActions from './actions/app'; //
import * as playersActions from './actions/players';


import LoggedOut from './layouts/LoggedOut';
import LoggedIn from './layouts/LoggedIn';
import Loading from './components/Loading';


class Missiles extends Component {

  constructor(props) {
    super(props);
    this.state = { appInitialized: false }
  }

  componentWillMount() {
    const { appActions, connectedRef } = this.props;
    // Dispatch a Firebase action to set the connection status
    appActions.checkConnection(connectedRef);
  }

  componentDidMount () {
    const { appActions} = this.props;
    // This listener determines whether user is logged in or not
    appActions.listenForAuthChanges();


  }

  componentDidUpdate(prevProps, prevState) {

    const { connected, authData } = this.props;
    const { appInitialized } = this.state;

    if(connected && authData.uid && !appInitialized ) {
      // We know the user is authorized, so lets grab data!
      this._initializeApp();
    }

  }
  _initializeApp() {

    const { playersActions, playersRef, weaponsActions, } = this.props;

    this.setState({appInitialized: true});

    playersActions.listenForPlayers(playersRef);
    weaponsActions.listenForWeapons();


  }


  render() {
    const { connected, authData, user, players } = this.props;


    // if (!connected || players.length <= 0 ) {
      if (!connected ) {
      return <Loading />;

    } else if (user.username) {
      return <LoggedIn />;

    } else {
      return <LoggedOut />;
    }
  }

}



function mapStateToProps(state) {
  return {
    connected: state.app.connected,
    authData: state.app.authData,
    user: state.app.user,
    connectedRef: state.firebase.connectedRef,
    playersRef: state.firebase.playersRef,
    players: state.players,
    missilesRef: state.firebase.dataRef.child('missiles'),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    playersActions: bindActionCreators(playersActions, dispatch),
    weaponsActions: bindActionCreators(WeaponsActions, dispatch),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Missiles)
