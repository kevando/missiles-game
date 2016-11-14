import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const MissileListItem = (props) => {
  const { text, onPress } = props;
  return (

      <Text style={styles.buttonText}>
        {text}
      </Text>
    
  );
};


export default MissileListItem;
