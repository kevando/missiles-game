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

import missileImg from '../../images/missileIcon.png';
import peaceIcon from '../../images/peaceIcon.png';
import explosionIcon from '../../images/explosionIcon.png';
import crossIco from '../../images/crossIco.png';

import Routes from '../../config/routes';

import Emoji from '../../components/Emoji';
import styles from './styles';

import _ from 'lodash';

import Modal from 'react-native-simple-modal';

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

class Launch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      location: null,
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
      modalOpen: false,


    };
  }

  componentWillMount() {

    // SET CURRENT REGION as users locaton
    var currentRegion;
    navigator.geolocation.getCurrentPosition(
      (position) => {
       console.log('getCurrentPosition',position);

       currentRegion = {
         latitude: position.coords.latitude,
         longitude: position.coords.longitude,
         latitudeDelta: LATITUDE_DELTA,
         longitudeDelta: LONGITUDE_DELTA,
       };
        this.setState({currentRegion});
        this.setState({
          senderMarker: {
              coordinate: {
                latitude: currentRegion.latitude,
                longitude: currentRegion.longitude,
              },
            },
            missileCoordinate: new MapView.AnimatedRegion({
              latitude: currentRegion.latitude,
              longitude: currentRegion.longitude,
            }),
            missileMarker: {
              coordinate: new MapView.AnimatedRegion({
                latitude: currentRegion.latitude,
                longitude: currentRegion.longitude,
              }),
            }
        });
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

//
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

  componentWillUnmount(){
    this.props.setLocation(null); // Clear Redux so markers stay in sync
  }

  onRegionChange(region) {
    this.setState({ region });
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
    const { currentRegion, location } = this.state;

    this.setState({
      flightPath: {
        coordinates: [currentRegion, location.coordinate]
      },
    });
  }


  fireMissile() {

    const { fireMissile, weapon, user } = this.props;

    var missile = _.cloneDeep(weapon.missile);

    missile.sender = user;
    missile.target = weapon.target;
    missile.status = 'airborn';
    missile.firedAt = Date.now();
    missile.destination = weapon.location;//{latitude: this.state.targetMarker.coordinate.latitude, longitude: this.state.targetMarker.coordinate.longitude}

    // Redux
    fireMissile(missile);

    // Animation
    this.fitMarkers();

    this.setState({launched: true, zoomEnabled: false, scrollEnabled: false});

    this.state.missileMarker.coordinate.timing({
      latitude: weapon.location.latitude,
      longitude: weapon.location.longitude,
      duration: 5000,
      delay: 3000
    }).start(this.setImpact.bind(this,missile));

    //this.state.missileMarker.coordinate.addListener((coordinate) => this.setState({distance: getDistance(coordinate)}));


  }

  fitMarkers() {
    this.map.fitToCoordinates([this.state.senderMarker.coordinate, this.props.weapon.location], {
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
  //

  renderHomeMarker(){
    return (
      <MapView.Marker coordinate={this.state.currentRegion}>
        <Emoji name="statue_of_liberty" style={styles.emoji}/>
      </MapView.Marker>
    )
  }
  renderTargetMarker(){
    if(this.state.location){
      return (
        <MapView.Marker coordinate={this.state.location.coordinate}>
        <Emoji name="point_down" style={styles.emoji}/>
        </MapView.Marker>
      )
    }
  }

  renderFireButton(){
    const {missile,target,location} = this.props.weapon;
    if(missile && target && location && !this.state.impact){
      return (
        <TouchableOpacity onPress={this.fireMissile.bind(this)}style={styles.button}>
          <Text style={{color:'#fff'}}>FIRE MISSILE</Text>
        </TouchableOpacity>
      )
    }
  }

  onMapPress(e) {
    this.props.setLocation(e.nativeEvent.coordinate); // Redux
    if(true){
      this.setState({
        location: {
            coordinate: e.nativeEvent.coordinate,
          },
          distance: getDistance(e.nativeEvent.coordinate),
          missileDirection: angle(this.state.currentRegion.latitude,this.state.currentRegion.longitude,e.nativeEvent.coordinate.latitude,e.nativeEvent.coordinate.longitude)
      });

    }
  }

  onMissileSelect(missile) {
    this.props.setMissile(missile);
    this.setState({modalOpen: false});
  }


  render() {
    if(!this.state.currentRegion) return <View />

    const {weapon, navigator} = this.props;

    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          ref={ref => { this.map = ref; }}
          mapType={MAP_TYPES.TERRAIN}
          style={styles.map}
          initialRegion={this.state.currentRegion}
          onRegionChange={region => this.onRegionChange(region)}
          onPress={(e) => this.onMapPress(e)}
          showsUserLocation={true}
          zoomEnabled={this.state.zoomEnabled}
          scrollEnabled={this.state.scrollEnabled}
          pitchEnabled={true}
          rotateEnabled={false}
        >

        { this.renderHomeMarker() }
        { this.renderTargetMarker() }


        {this.state.launched &&
          <MapView.Marker.Animated
            coordinate={this.state.missileMarker.coordinate}
            image={missileImg}
            style={{transform: [{rotate: this.state.missileDirection+'deg'}],}}
          />
        }


          {this.state.flightPath &&
            <MapView.Polyline
              key="flightPathPolyline"
              coordinates={this.state.flightPath.coordinates}
              strokeColor="#F00"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={2}
            />
          }

        </MapView>


        <View style={styles.buttonContainer}>








        </View>
        <View style={styles.navContainer}>

        { this.renderFireButton() }

        {this.props.weapon.target &&
          <Text style={styles.distance}>TARGET: {this.props.weapon.target.username}</Text>
        }

        {!this.props.user.weapons &&
          <Text style={styles.distance}>YOU HAVE NO MISSILES</Text>
        }

        {this.props.user.weapons && !this.props.weapon.missile &&
          <Text onPress={()=>this.setState({modalOpen:true})} style={styles.chooseMissile}>Choose your missile</Text>
        }

        {this.props.weapon.missile &&
          <Text style={styles.distance}>MISSILE: {this.props.weapon.missile.name}</Text>
        }

        </View>

        <Modal
           offset={this.state.modalOffset}
           open={this.state.modalOpen}
           modalDidOpen={() => console.log('modal did open')}
           modalDidClose={() => this.setState({modalOpen: false})}
           style={{alignItems: 'center'}}>
               <View>
                {
                  _.map(this.props.user.weapons,(weapon,i)=>{
                    return (<TouchableOpacity
                       style={{margin: 5}} key={i}
                       onPress={this.onMissileSelect.bind(this,weapon)}>
                       <Text>{weapon.name}</Text>
                    </TouchableOpacity> )
                  })
                }


               </View>
            </Modal>

      </View>
    );
  }
}



module.exports = Launch;
