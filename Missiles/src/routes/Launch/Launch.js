import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';

import MapView, { MAP_TYPES } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922; // Zoom level?
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let id = 0;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


class Launch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },

      // markers: [],
      targetMarker: null,
      senderMarker: null,

      polylines: [],
      editing: null,
      flightPath: null,
    };
  }

  componentDidMount() {
    this.setState({
      senderMarker: {
          coordinate: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
          },
          // key: id++,
          color: 'blue',
        },
    });
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
      ...this.state.region,
      latitude: targetMarker.coordinate.latitude,// + ((Math.random() - 0.5) * (region.latitudeDelta / 2)),
      longitude: targetMarker.coordinate.longitude,// + ((Math.random() - 0.5) * (region.longitudeDelta / 2)),
      // latitudeDelta: region.latitudeDelta + ((Math.random() - 0.5) * (region.latitudeDelta / 2)),
      // longitudeDelta: region.longitudeDelta + ((Math.random() - 0.5) * (region.longitudeDelta / 2)),
    };
  }


  onMapPress(e) {
    console.log('coord',e.nativeEvent.coordinate)
    this.setState({
      targetMarker: {
          coordinate: e.nativeEvent.coordinate,
          // key: id++,
          color: 'red',
        },
    });
  }

  setFlightPath() {
    const { polylines, editing, senderMarker, targetMarker } = this.state;
    this.setState({
      flightPath: {
        coordinates: [
          senderMarker.coordinate,
          targetMarker.coordinate
        ]
      },
    });
  }

  finish() {
    const { polylines, editing } = this.state;
    this.setState({
      polylines: [...polylines, editing],
      editing: null,
    });
  }

  onPanDrag(e) {
    const { editing } = this.state;
    if (!editing) {
      this.setState({
        editing: {
          id: id++,
          coordinates: [e.nativeEvent.coordinate],
        },
      });
    } else {
      this.setState({
        editing: {
          ...editing,
          coordinates: [
            ...editing.coordinates,
            e.nativeEvent.coordinate,
          ],
        },
      });
    }
  }

  render_polyline() {

    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
          scrollEnabled={false}
          onPanDrag={e => this.onPanDrag(e)}
        >
          {this.state.polylines.map(polyline => (
            <MapView.Polyline
              key={polyline.id}
              coordinates={polyline.coordinates}
              strokeColor="#000"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={1}
            />
          ))}
          {this.state.editing &&
            <MapView.Polyline
              key="editingPolyline"
              coordinates={this.state.editing.coordinates}
              strokeColor="#F00"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={1}
            />
          }
        </MapView>
        <View style={styles.buttonContainer}>
          {this.state.editing && (
            <TouchableOpacity
              onPress={() => this.finish()}
              style={[styles.bubble, styles.button]}
            >
              <Text>Finish</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          ref={ref => { this.map = ref; }}
          mapType={MAP_TYPES.TERRAIN}
          style={styles.map}
          initialRegion={this.state.region}
          onRegionChange={region => this.onRegionChange(region)}
          onPress={(e) => this.onMapPress(e)}
          showsUserLocation={true}
        >

        {this.state.senderMarker ?
          <MapView.Marker
            coordinate={this.state.senderMarker.coordinate}
            pinColor={this.state.senderMarker.color}
          />
          : null}
        {this.state.targetMarker ?
          <MapView.Marker
            coordinate={this.state.targetMarker.coordinate}
            pinColor={this.state.targetMarker.color}
          />
          : null}

          {this.state.flightPath &&
            <MapView.Polyline
              key="flightPathPolyline"
              coordinates={this.state.flightPath.coordinates}
              strokeColor="#F00"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={1}
            />
          }

        </MapView>

        <View style={[styles.bubble, styles.latlng]}>
          <Text style={{ textAlign: 'center' }}>
            {this.state.region.latitude.toPrecision(7)},
            {this.state.region.longitude.toPrecision(7)}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.jumpRandom()}
            style={[styles.bubble, styles.button]}
          >
            <Text>Jump</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.animateToHome()}
            style={[styles.bubble, styles.button]}
          >
            <Text>Animate</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.setFlightPath()}
            style={[styles.bubble, styles.button]}
          >
            <Text>Set Path</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

Launch.propTypes = {
  provider: MapView.ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

module.exports = Launch;
