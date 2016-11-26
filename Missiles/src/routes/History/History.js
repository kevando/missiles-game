import React from 'react';
import { Text, View, ScrollView } from 'react-native';

import Button from '../../components/Button';
import Missile from '../../components/MissileListItem';
import styles from './styles';
// import Routes from '../../config/Routes'; // not yet

import _ from 'lodash';

const History = (props) => {

  const { missiles, navigator, uid } = props;

  const myMissiles = _.filter(missiles,({sender, target}) => { return sender.uid == uid || target.uid == uid });


  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerText}>Your past engagement</Text>
        </View>

        {
          _.map(myMissiles,(missile,i) => {
            return <Missile missile={missile} key={i} />
          })
        }


      </ScrollView>
    </View>
  );
};


export default History;
