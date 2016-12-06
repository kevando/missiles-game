


import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
  Vibration,
} from 'react-native';

import MapView, { MAP_TYPES } from 'react-native-maps';


import Routes from '../../config/routes';

import Emoji from 'react-native-emoji';
import _ from 'lodash';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;


// lexington
const LATITUDE = 38.103197;
const LONGITUDE = -84.506488;

const LATITUDE_DELTA = 7.122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };
const SPACE = 0.01;



// function getDistance(lat1, lon1, lat2, lon2) {
function getDistance(destinationCoordinate) {

  var lat1 = destinationCoordinate.latitude;
  var lon1 = destinationCoordinate.longitude;
  var lat2 = LATITUDE;
  var lon2 = LONGITUDE;

  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p))/2;

  const distance = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km

  return Math.round(distance * 100) / 100 // round to nearest 1000th
}

function angle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  var thetaWhole = Math.round(theta);
  // alert(thetaWhole);
  return thetaWhole
}


import Launch from './Launch';

export default class LaunchContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      launched: false,
      distance: 'unknown',

      zoomEnabled: true,
      scrollEnabled: true, // set to false after firing

      weapon: null,

      targetMarker: null,

      // missileCoordinate: new MapView.AnimatedRegion({
      //   latitude: LATITUDE,
      //   longitude: LONGITUDE,
      // }),

      missileMarker: null,

      senderMarker: {
        coordinate: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
        }
      },

      polylines: [],
      editing: null,
      flightPath: null,
    };
  }

  componentWillMount() {

//     // SET CURRENT REGION as users locaton
//     var currentRegion;
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//        console.log('getCurrentPosition',position);
//
//        currentRegion = {
//          latitude: position.coords.latitude,
//          longitude: position.coords.longitude,
//          latitudeDelta: LATITUDE_DELTA,
//          longitudeDelta: LONGITUDE_DELTA,
//        };
//         this.setState({currentRegion});
//         this.setState({
//           senderMarker: {
//               coordinate: {
//                 latitude: currentRegion.latitude,
//                 longitude: currentRegion.longitude,
//               },
//             },
//             missileCoordinate: new MapView.AnimatedRegion({
//               latitude: currentRegion.latitude,
//               longitude: currentRegion.longitude,
//             }),
//             missileMarker: {
//               coordinate: new MapView.AnimatedRegion({
//                 latitude: currentRegion.latitude,
//                 longitude: currentRegion.longitude,
//               }),
//             }
//         });
//       },
//       (error) => alert(error.message),
//       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
//     );
//     this.watchID = navigator.geolocation.watchPosition((position) => {
//        console.log('watchPosition',position);
//        currentRegion = {
//          latitude: position.coords.latitude,
//          longitude: position.coords.longitude,
//          latitudeDelta: LATITUDE_DELTA,
//          longitudeDelta: LONGITUDE_DELTA,
//        };
//       this.setState({currentRegion});
//       this.setState({
//         senderMarker: {
//             coordinate: {
//               latitude: currentRegion.latitude,
//               longitude: currentRegion.longitude,
//             },
//           },
//           missileCoordinate: new MapView.AnimatedRegion({
//             latitude: currentRegion.latitude,
//             longitude: currentRegion.longitude,
//           }),
//           missileMarker: {
//             coordinate: new MapView.AnimatedRegion({
//               latitude: currentRegion.latitude,
//               longitude: currentRegion.longitude,
//             }),
//           }
//       });
//
//     });
// //
//     this.setState({
//       targetMarker: {
//     coordinate: {
//       latitude: this.props.target.location.coords.latitude,
//       longitude: this.props.target.location.coords.longitude,
//     },
//     color: 'green',
// },
//
//     });



  }

  onRegionChange(region) {
    this.setState({ region });
  }



  animateToHome() {
    this.map.animateToRegion(this.homeRegion());
  }

  homeRegion() {
    // alert('asdf')
    const { region, targetMarker } = this.state;
    return {
      // ...this.state.region,
      latitude: targetMarker.coordinate.latitude,// + ((Math.random() - 0.5) * (region.latitudeDelta / 2)),
      longitude: targetMarker.coordinate.longitude,// + ((Math.random() - 0.5) * (region.longitudeDelta / 2)),
      // latitudeDelta: region.latitudeDelta + ((Math.random() - 0.5) * (region.latitudeDelta / 2)),
      // longitudeDelta: region.longitudeDelta + ((Math.random() - 0.5) * (region.longitudeDelta / 2)),
    };
  }


  onMapPress(e) {
    if(!this.state.launched){
      this.setState({
        targetMarker: {
            coordinate: e.nativeEvent.coordinate,
            color: 'red',
          },
          distance: getDistance(e.nativeEvent.coordinate),
          missileDirection: angle(this.state.currentRegion.latitude,this.state.currentRegion.longitude,e.nativeEvent.coordinate.latitude,e.nativeEvent.coordinate.longitude)
      });

    }
  }

  setImpact(missile) {

    const { setImpact, weapon } = this.props;
    // Redux
    setImpact(missile);
    this.setFlightPath();
    this.setState({impact:true})
    Vibration.vibrate();

    // set explosion
  }


  setFlightPath() {
    const { polylines, editing, senderMarker, targetMarker } = this.state;

    //
    this.setState({
      flightPath: {
        coordinates: [
          senderMarker.coordinate,
          targetMarker.coordinate
        ]
      },
    });
  }


  fireMissile() {

    const { fireMissile, weapon, target, user } = this.props;



    var missile = _.cloneDeep(weapon);

    missile.sender = user;
    missile.target = target;
    missile.status = 'airborn';
    missile.firedAt = Date.now();
    missile.destination = {latitude: this.state.targetMarker.coordinate.latitude, longitude: this.state.targetMarker.coordinate.longitude}

    // Redux (bad name)
    fireMissile(missile);
    // Where does notification happen?



    // Animation
    this.fitMarkers();

    this.setState({launched: true, zoomEnabled: false, scrollEnabled: false});

    this.state.missileMarker.coordinate.timing({
      latitude: this.state.targetMarker.coordinate.latitude,
      longitude: this.state.targetMarker.coordinate.longitude,
      duration: 5000,
      delay: 3000
    }).start(this.setImpact.bind(this,missile));

    this.state.missileMarker.coordinate.addListener((coordinate) => this.setState({distance: getDistance(coordinate)}));


  }

  fitMarkers() {
    this.map.fitToCoordinates([this.state.senderMarker.coordinate, this.state.targetMarker.coordinate], {
      edgePadding: DEFAULT_PADDING,
      animated: true,

    });
  }



  setCoordinateAnimated() {
    // alert('animate marker');
    this.state.someMarker.coordinate.timing({
      latitude: this.state.targetMarker.coordinate.latitude,
      longitude: this.state.targetMarker.coordinate.longitude,
      duration: 5000
    }).start();
  }

  setDestination(){
    this.setState({destination:true});
  }


  render() {


    return (
      <Launch {...this.props} />
    );
  }
}
