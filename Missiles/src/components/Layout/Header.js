import React from 'react';
import { View } from 'react-native';

import * as Text from '../Text';
import styles from './styles';

const Header = (props) => {
  return (
    <View style={styles.headerWrapper}>
      <Text.H2>
        {props.children}
      </Text.H2>
    </View>
  );
};



export default Header;
