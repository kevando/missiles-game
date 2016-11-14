import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';


import Button from '../../components/Button';
import styles from './styles';
import Routes from '../../config/routes'; // put this in redux?

import _ from 'lodash';


class Friends extends Component {


  render() {
    const { user, navigator, players, weapons } = this.props;

    // var availableWeapons = [user.weapons[0]];
    // availableWeapons.push(user.weapons[0]);// HARDCODING CAUSE IM DUMB
    // alert(user.weapons[0])
    // console.log(user.weapons)

    return (
      <View style={styles.container}>

      {
        _.map(players,(target,i) => {
          return (
            <View style={styles.buttons} key={i} >
              <Button text={`Fire at ${target.username}`} onPress={(target) => navigator.push(Routes.getLaunchRoute(target,user.weapons)) } />
            </View>
          )
        })
      }





      </View>
    );
  }


};


export default Friends;
