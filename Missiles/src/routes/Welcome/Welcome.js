import React , { Component } from 'react';
import { Text, View, Image } from 'react-native';

import Permission from '../../components/Permission';
import styles from './styles';

class Welcome extends Component {



  render() {
    const { updateState, logIn, } = this.props;


    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome to Missiles</Text>
        </View>

        <View style={styles.buttons}>
          <Permission permission='notification' reason='We need these for fresh'  />
        </View>

        <View style={styles.buttons}>
          <Permission permission='photo' reason='We need these to take pics'  />
        </View>



      </View>
    );

  }
};


export default Welcome;
