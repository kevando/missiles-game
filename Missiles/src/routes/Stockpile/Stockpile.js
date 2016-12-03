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

      <View style={styles.header}>
        {user.weapons ?
          <Text style={styles.headerText}>You have missiles</Text>
        :
          <Text>You have no missiles</Text>
        }
      </View>


      {
        _.map(user.weapons,(weapon,i) => {
          return <MyWeapon weapon={weapon} key={i} />
        })
      }

      <View style={styles.header}>
        <Text style={styles.headerText}>You have {user.balance} coins</Text>
      </View>

        <View style={styles.buttons} >
          <Button text="Shop Market" onPress={() => navigator.push(Routes.getMarketRoute()) } />
        </View>



      </View>
    );
  }


};


export default Stockpile;
