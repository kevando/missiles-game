import React , { Component } from 'react';
import { Text, View, Image, Alert } from 'react-native';

import Button from '../../components/Button';
import styles from './styles';
import Routes from '../../config/routes';

import store from 'react-native-simple-store';
import BackgroundGeolocation from "react-native-background-geolocation";

import _ from 'lodash';

class Location extends Component {

  constructor(props){
    super(props);

  }

  componentWillMount() {

    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.on('location', this.onLocation.bind(this));

    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.on('motionchange', this.onMotionChange.bind(this));

    // Now configure the plugin.
    BackgroundGeolocation.configure({
      // Geolocation Config
      desiredAccuracy: 0, // 0,10,100,1000
      stationaryRadius: 25,
      distanceFilter: 10, // minimum distance in m before recording an update


      useSignificantChangesOnly: true, // attempting this to save battery


      activityRecognitionInterval: 10000, // attempt to save battery
      // Activity Recognition
      stopTimeout: 1,
      // Application config
      debug: true, // <-- enable for debug sounds & notifications
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config
      // url: 'http://posttestserver.com/post.php?dir=cordova-background-geolocation',
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
    // Remove BackgroundGeolocation listeners
    BackgroundGeolocation.un('location', this.onLocation);
    BackgroundGeolocation.un('motionchange', this.onMotionChange);
  }



  onLocation(location) {
    this.props.dataRef.child('locations').push({type:'onLocation', location });
    // console.log('- [js]location: ', JSON.stringify(location));

    

  }



  onMotionChange(location) {
    this.props.dataRef.child('locations').push({type:'onMotionChange', location });
  }






  render() {
    const { navigator } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>BG Location Tracking</Text>
        </View>
      </View>
    );
  }
};


export default Location;
