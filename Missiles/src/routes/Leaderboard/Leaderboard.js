import React from 'react';
import { Text, View, Image } from 'react-native';

import Button from '../../components/Button';
import styles from './styles';

import Emoji from 'react-native-emoji';
import _ from 'lodash';

const Leaderboard = (props) => {
  const { players } = props;

  var n00b = _.maxBy(players, 'loggedInAt');
  var topDawg = _.maxBy(players, (p) => { return p.frags; });

  if(!topDawg) return <View /> // should be loading but whatever

  return (
    <View style={styles.container}>

      <View style={styles.top}>

        <View style={styles.header}>
          <Text style={styles.headerText}><Emoji name="star2" />3 ELECTION BOMBSHELLS</Text>
        </View>

        <View style={styles.title}>
          <Text style={styles.titleMissile}>MISSILE</Text>
          <Text style={styles.titleNews}>NEWS</Text>
          <Text style={styles.contentTitle}>Page 2</Text>
        </View>


        <View style={styles.content}>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex:3}}><Text style={{fontSize:14}}>Username</Text></View>
          <View style={{flex:1}}><Text style={{fontSize:14}}>Frags</Text></View>
          <View style={{flex:1}}><Text style={{fontSize:14}}>Deaths</Text></View>
        </View>

          {
            _.map(players, function(player,i) {
              return(
                <View style={{flex: 1,flexDirection: 'row'}} key={i}>
                  <View style={{flex:3}}><Text style={{fontSize:12}}>{player.username}</Text></View>
                  <View style={{flex:1}}><Text style={{fontSize:14}}>{player.frags}</Text></View>
                  <View style={{flex:1}}><Text style={{fontSize:14}}>{player.deaths}</Text></View>
                </View>
              )
            })
          }

        </View>


      </View>


    </View>
  );
};


export default Leaderboard;

//<Text style={styles.backgroundEmoji}><Emoji name="statue_of_liberty" /></Text>

// worse than we feared
//:scream_cat:

// heating up :thermometer:

// got slammed eating a taco, but why did he tell his friends he was getting a burrito?
//:taco: :burrito:
