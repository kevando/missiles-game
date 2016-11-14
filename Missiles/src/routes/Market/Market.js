import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

import Button from '../../components/Button';
import { Header } from '../../components/Layout';
import { ForSale } from '../../components/Weapons';
import styles from './styles';

import _ from 'lodash';


class Market extends Component {


  render() {
    const { user, weapons, buyWeapon } = this.props;

    return (

      <View style={styles.container}>

        <Header>
          <Text>Available Coins: {user.balance}</Text>
        </Header>

        <View style={styles.weapons}>

        {
          _.map(weapons,(weapon,i) => {
            return <ForSale weapon={weapon} key={i} balance={user.balance} onPress={buyWeapon} />
          })
        }

        </View>

      </View>
    );
  }

};


export default Market;
