import React from 'react';
import { View, Text, Image } from 'react-native';

import { H2, } from '../Text';
import Button from '../Button';
import styles from './styles';
import images from '../../config/images';

const ForSale = ({weapon, balance, onPress }) => {

  const { name, price,image } = weapon;
  return (
    <View style={styles.forSaleWrapper}>
      <View style={{flex:2,flexDirection:'column',}}>
        <Image resizeMode={Image.resizeMode.contain} source={images.weapons[image]} style={styles.image}/>
      </View>
      <View style={{flex:3,flexDirection:'column',}}>
      <H2>{name}</H2>
      <Text>Price: {price} coins</Text>
      {
        balance >= price ?
        <Button onPress={onPress.bind(this,weapon)} text="Buy this" />
        :
        <Text>Unavailable</Text>
      }
      </View>

    </View>
  );
};



export default ForSale;
