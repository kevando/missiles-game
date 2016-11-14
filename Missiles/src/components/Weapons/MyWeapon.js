import React from 'react';
import { View, Text } from 'react-native';

import { H2, } from '../Text';
import Button from '../Button';
import styles from './styles';

const MyWeapon = ({weapon, onPress }) => {

  const { name, price } = weapon;

  return (
    <View style={styles.myWeaponWrapper}>
      <H2>{name}</H2>

    </View>
  );
};



export default MyWeapon;
