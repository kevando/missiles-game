import React from 'react';
import { Text } from 'react-native';

import styles from './styles';

const H2 = (props) => {
  return (
    <Text style={styles.h2}>
      {props.children}
    </Text>
  );
};



export default H2;
