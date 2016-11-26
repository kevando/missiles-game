import React from 'react';
import { View, Text, Image } from 'react-native';

import { H2, } from '../Text';
import Button from '../Button';
import styles from './styles';
import images from '../../config/images';

const MyWeapon = ({weapon, onPress }) => {

  const { name, price, image } = weapon;

  return (
    <View style={styles.myWeaponWrapper}>
      <Image resizeMode={Image.resizeMode.contain} source={images.weapons[image]} style={styles.largeImage}/>
      <H2>{name}</H2>

    </View>
  );
};



export default MyWeapon;
