import React from 'react';
import { View, Text } from 'react-native';

import { H2, } from '../Text';
import Button from '../Button';
import styles from './styles';

const ForSale = ({weapon, balance, onPress }) => {

  const { name, price } = weapon;
  return (
    <View style={styles.forSaleWrapper}>
      <H2>{name}</H2>
      <Text>Price: {price}</Text>

      {
        balance > price ?
        <Button onPress={onPress.bind(this,weapon)} text="Buy this" />
        :
        <Text>Unavailable</Text>
      }

    </View>
  );
};



export default ForSale;
