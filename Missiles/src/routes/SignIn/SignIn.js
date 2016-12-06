import React from 'react';
import { Text, View, AlertIOS } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Button from '../../components/Button';

import styles from './styles';

const SignIn = (props) => {

  const { logIn, loggingIn } = props;

  const devMode = false;

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}>Missiles</Text>
      </View>

      <View style={styles.buttons}>
        <Text>{ loggingIn ? 'Logging in..' : null }</Text>
      </View>

      <View style={styles.buttons}>
        <Button text="Sign In" onPress={() => AlertIOS.prompt('Username',null,[ {text: 'Log In', onPress: username => logIn(username), style: 'cancel'}, {text: 'Cancel', onPress: password => console.log('OK Pressed, password: ')}, ],)} />
      </View>

      <KeyboardSpacer />
    </View>
  );
};


export default SignIn;
