import React from 'react';
import { Text, View, Image } from 'react-native';

import Missile from '../../components/MissileListItem';
import styles from './styles';

import _ from 'lodash';


const Stockpile = (props) => {
  const { missiles } = props;

  return (
    <View style={styles.container}>

      {
        _.map(missiles,(missile) => {
          return <Text key={missile.name}>{missile.name}</Text>
        })
      }

    </View>
  );
};


export default Stockpile;
