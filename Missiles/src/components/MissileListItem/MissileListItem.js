import React from 'react';
import { Text, View } from 'react-native';

import { H2 } from '../Text';
import styles from './styles';

const MissileListItem = (props) => {
  const { missile } = props;

  return (

      <View style={styles.container}>
        <H2>{missile.sender.username} fired a missile at {missile.target.username}</H2>
      </View>

  );
};


export default MissileListItem;
