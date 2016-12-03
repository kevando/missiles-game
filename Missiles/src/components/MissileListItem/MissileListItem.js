import React from 'react';
import { Text, View } from 'react-native';

import { H2 } from '../Text';
import styles from './styles';

import Emoji from 'react-native-emoji';
import moment from 'moment';

const MissileListItem = (props) => {

  const { sender, target, frag, firedAt } = props.missile;

  return (

      <View style={styles.container}>
        <H2>{sender.username} <Emoji name='rocket' /> {target.username} {frag && <Emoji name='boom' />  }</H2>
        <Text>{moment(firedAt).fromNow()}</Text>
      </View>

  );
};


export default MissileListItem;
