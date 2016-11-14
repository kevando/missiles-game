import React from 'react';
import { Text, View, Image } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Button from '../../components/Button';

import styles from './styles';

const History = (props) => {
  const { updateState, logIn, } = props;

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}>NEWS</Text>
      </View>

      <View style={styles.buttons}>
        <Button text="Sign In as Kevin" onPress={() => logIn('kevin')} />
      </View>

      <KeyboardSpacer />
    </View>
  );
};


export default History;
