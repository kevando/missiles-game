import React from 'react';
import { Text, View, Image } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Button from '../../components/Button';

import styles from './styles';

const SignIn = (props) => {

  const { logIn, playersRef, loggingIn } = props;

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}>Missiles</Text>
      </View>

      <View style={styles.buttons}>
        <Text>{ loggingIn ? 'Logging in..' : null }</Text>
      </View>

      <View style={styles.buttons}>
        <Button text="Sign In as Kevin" onPress={() => logIn('kevin',playersRef)} />
      </View>

      <KeyboardSpacer />
    </View>
  );
};


export default SignIn;
