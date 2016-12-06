import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

import Button from '../../components/Button';
import { Header } from '../../components/Layout';
import { ForSale } from '../../components/Weapons';
import styles from './styles';

import _ from 'lodash';


class Market extends Component {


  render() {
    const { user, missiles, buyMissile } = this.props;

    return (

      <View style={styles.container}>

        <Header>
          <Text>Available Coins: {user.balance}</Text>
        </Header>

        <View style={styles.weapons}>

        {
          _.map(missiles,(missile,i) => {
            return <ForSale weapon={missile} key={i} balance={user.balance} onPress={buyMissile} />
          })
        }

        </View>

      </View>
    );
  }

};


export default Market;
