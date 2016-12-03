
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
  MissilesActions,
} from './actions';

import * as appActions from './actions/app'; //
import * as playersActions from './actions/players';


import LoggedOut from './layouts/LoggedOut';
import LoggedIn from './layouts/LoggedIn';
import Loading from './components/Loading';

import BackgroundGeolocation from 'react-native-background-geolocation';
import store from 'react-native-simple-store';


class Missiles extends Component {

  componentWillMount() {

    // alert('component will mount')
    const { appActions, connectedRef } = this.props;
    // Dispatch a Firebase action to set the connection status
    appActions.checkConnection(connectedRef);

    // This listener determines whether user is logged in or not
    appActions.listenForAuthChanges();


    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.on('location', this.onLocation.bind(this));

    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.on('motionchange', this.onMotionChange);

    // Now configure the plugin.
    BackgroundGeolocation.configure({
      // Geolocation Config
      desiredAccuracy: 0,
      stationaryRadius: 25,
      distanceFilter: 10,
      // Activity Recognition
      stopTimeout: 1,
      // Application config

      // attempts to save battery
      // disabling while in dev mode
      useSignificantChangesOnly: true,

      debug: false, // <-- enable for debug sounds & notifications
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config
      http: 'https://missile-launch-bb06a.firebaseio.com/demo-app-locations1.json',
      method: 'POST',
      autoSync: true,         // <-- POST each location immediately to server
      // params: {               // <-- Optional HTTP params
      //   "auth_token": "maybe_your_server_authenticates_via_token_YES?"
      // }
    }, function(state) {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

      if (!state.enabled) {
        BackgroundGeolocation.start(function() {
          console.log("- Start success");
        });
      }
    });
  }
  // You must remove listeners when your component unmounts
  componentWillUnmount() {
    alert('component unmounted')
    // Remove BackgroundGeolocation listeners
    BackgroundGeolocation.un('location', this.onLocation);
    BackgroundGeolocation.un('motionchange', this.onMotionChange);
  }
  onLocation(location) {
    // no fucking data is saved here, so i gotta pull it i guess
    const { dataRef } = this.props;
    store.get('user')
      .then(user => {
        if(user) {
          dataRef
            .child('players')
            .child(user.uid)
            .update({location});
        }

      })

    console.log('- [js]location: ', JSON.stringify(location));

    // console.log(this.props)
    // alert('location changed'+user.uid);
    // if(authData.uid){
    //   dataRef
    //     .child('players')
    //     .child(uid)
    //     .update({location});
    // }


  }
  onMotionChange(location) {
    console.log('- [js]motionchanged: ', JSON.stringify(location));
  }


  constructor(props) {
    super(props);
    this.state = { appInitialized: false }
  }


  componentDidMount () {



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

    const { playersActions, weaponsActions, missilesActions } = this.props;

    this.setState({appInitialized: true});

    playersActions.listenForPlayers();
    weaponsActions.listenForWeapons();
    missilesActions.listenForMissiles();


  }


  render() {
    const { connected, authData, user, players, initialized, loggingIn } = this.props;



    if (!connected) {
      return <Loading message="Connecting" />;

    } else if (loggingIn) {
      return <Loading message="Logging In" />;

    } else if (user.uid) {
      // alert(user.uid)
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
    players: state.players,
    initialized: state.app.initialized,
    loggingIn: state.app.loggingIn,
    dataRef: state.firebase.dataRef,
    uid: state.app.authData.uid
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    playersActions: bindActionCreators(playersActions, dispatch),
    weaponsActions: bindActionCreators(WeaponsActions, dispatch),
    missilesActions: bindActionCreators(MissilesActions, dispatch),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Missiles)
