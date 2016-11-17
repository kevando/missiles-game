import React , { Component } from 'react';
import { Text, View, Image, Alert } from 'react-native';

import Button from '../../components/Button';
import styles from './styles';
import Routes from '../../config/routes';

const Permissions = require('react-native-permissions');
import FCM from "react-native-fcm";
import store from 'react-native-simple-store';

import _ from 'lodash';

class Welcome extends Component {

  constructor(props){
    super(props);
    this.state = {
      permissions: {
        notification: 'undetermined',
        location: 'undetermined',
        camera: 'undetermined',
        photo: 'undetermined'
      },
      pushToken: 'null',
    }
  }

  componentDidMount() {
    const { setPushToken } = this.props;

    store.save('coffee', {isAwesome: true,flavor:'kevando'});

    this._checkPermissions();

    // not sure if I need to enable fcm permissions specifically
    // FCM.requestPermissions();

    FCM.getFCMToken().then(token => {
      console.log("TOKEN (getFCMToken)", token);

      // this.setState({pushToken: token});
      setPushToken(token);

    });


  }

  //check the status of multiple permissions
  _checkPermissions() {

    const { setPermissions } = this.props;

    Permissions.checkMultiplePermissions(['camera', 'photo','location','notification'])
      .then(response => {

        setPermissions({ //redux
          camera: response.camera,
          photo: response.photo,
          notification: response.notification,
          location: response.location,
        });

      });
  }


  _requestPermission(permission) {

    // alert(permission);
    // return;

    const { setPermissions, permissions } = this.props;

    Permissions.requestPermission(permission)
      .then(response => {
        //returns once the user has chosen to 'allow' or to 'not allow' access
        //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'


          // const permissions = {
          //   ...this.props.permissions,
          //   [permission]: response
          // }

          setPermissions({
            ...permissions,
            [permission]: response
          });
      });
  }


  _alertForPermission(permission) {

    // alert(permission)
    Alert.alert(
      'Can we have permission to your '+permission, //'Can we access your photos?',
      'We want to enhane your experience',//'We need access so you can set your profile pic',
      [
        {text: 'No way', onPress: () => console.log('permission denied'), style: 'cancel'},
        this.props.permissions[permission] == 'undetermined'?
          {text: 'OK', onPress: this._requestPermission.bind(this,permission)}
          : {text: 'Open Settings', onPress: Permissions.openSettings}
      ]
    )
  }

  render() {
    const { navigator, permissions } = this.props;

    // this works
    // store.get('coffee').then(coffee => {
    //   flavor = 'dude'//coffee.flavor;
    //   alert(coffee.flavor)
    // });



    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome to Missiles</Text>
          <Text style={styles.subHeaderText}>A fun game that lets you shoot missiles at your friends.</Text>
        </View>

        <View>

          { permissions.location == 'unknown' ?
            <Text>Loading permission status</Text>
          :

            <View style={styles.permissions}>

            <View style={styles.buttons} >
            {
              true &&
                <Button text="Proceed to app" onPress={()=>navigator.push(Routes.getSignInRoute())} />
            }
            </View>

          </View>


          }


        </View>



      </View>
    );

  }
};


export default Welcome;
