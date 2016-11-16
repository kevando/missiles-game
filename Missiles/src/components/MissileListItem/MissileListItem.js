import React from 'react';
import { Text, View } from 'react-native';

import { H2 } from '../Text';
import styles from './styles';

const MissileListItem = (props) => {
  const { missile } = props;

  return (

      <View style={styles.container}>
        <H2>You fired a missile at Aidan</H2>
      </View>

  );
};


export default MissileListItem;
