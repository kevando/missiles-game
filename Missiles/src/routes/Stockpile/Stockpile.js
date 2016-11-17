import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

import { MyWeapon } from '../../components/Weapons';
import Button from '../../components/Button';
import styles from './styles';
import Routes from '../../config/routes'; // put this in redux?
import { H2 } from '../../components/Text';

import _ from 'lodash';


class Stockpile extends Component {


  render() {
    const { user, navigator } = this.props;

    return (
      <View style={styles.container}>
      <H2>You have {user.balance} coins</H2>
      {!user.weapons && <H2>Your stockpile is empty</H2>}

      {
        _.map(user.weapons,(weapon,i) => {
          return <MyWeapon weapon={weapon} key={i} />
        })
      }

        <View style={styles.buttons} >
          <Button text="Shop Market" onPress={() => navigator.push(Routes.getMarketRoute()) } />
        </View>



      </View>
    );
  }


};


export default Stockpile;
