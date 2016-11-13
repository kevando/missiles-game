import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';

const Permissions = require('react-native-permissions');


class Permission extends Component{

  constructor(props){
    super(props);
    this.state = {
      status: 'unknown'
    }
  }

  componentDidMount() {

    const { permission } = this.props;

    this._handleGetPermissionStatus(permission);

  }

  _handleGetPermissionStatus(permission) {

    Permissions.getPermissionStatus(permission)
     .then(response => { //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'

         this.setState({ status: response });

     },this);

  }

  _handleRequestPermission(permission) {
    // alert(permission)

      Permissions.requestPermission('photo')
       .then(response => {
         this.setState({ status: response });
       });
    }


  render() {
  const { permission, onPress } = this.props;
  const { status } = this.state;

  if(status == 'authorized') {

    return (

      <Text>
        {permission} are all good
       </Text>

    );
  } else {

    return (
      <View style={{flex:1}}>
        <Text>{permission.description}</Text>
        <TouchableOpacity style={styles.button} onPress={this._handleRequestPermission }>
          <Text style={styles.buttonText}>
            {permission} are {status}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}


};




export default Permission;
