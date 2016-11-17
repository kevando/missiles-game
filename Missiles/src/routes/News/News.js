import React from 'react';
import { Text, View, Image } from 'react-native';

import Button from '../../components/Button';
import styles from './styles';

import Emoji from 'react-native-emoji';
import _ from 'lodash';

const News = (props) => {
  const { players } = props;

  var n00b = _.maxBy(players, 'loggedIn');
  var topDawg = _.maxBy(players, (p) => { return p.frags; });

  // alert(topDawg.username);

  return (
    <View style={styles.container}>

      <View style={styles.top}>

        <View style={styles.header}>
          <Text style={styles.headerText}><Emoji name="star2" />3 ELECTION BOMBSHELLS</Text>
        </View>

        <View style={styles.title}>
          <Text style={styles.titleMissile}>MISSILE</Text>
          <Text style={styles.titleNews}>NEWS</Text>
        </View>


        <View style={styles.content}>
          <Text style={styles.contentTitle}>CAN ANYONE STOP {topDawg.username.toUpperCase()}?? {"\n"}<Emoji name="fire" /><Emoji name="fire" /><Emoji name="fire" /></Text>
          <Text style={styles.faceEmoji}><Emoji name="scream_cat" /></Text>
        </View>


      </View>

      <View style={styles.bottom}>



        <View style={styles.footerTop}>
          <Text style={styles.footerTitle}>{n00b.username.toUpperCase()} is charged up and ready</Text>
          <Text style={styles.footerEmojis}><Emoji name="battery" /><Emoji name="electric_plug" /><Emoji name="crystal_ball" /><Emoji name="hole" /></Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}><Emoji name="no_smoking" /><Emoji name="no_smoking" />SMOKING KILLS<Emoji name="no_smoking" /> <Emoji name="no_smoking" /></Text>
        </View>

      </View>


    </View>
  );
};


export default News;

//<Text style={styles.backgroundEmoji}><Emoji name="statue_of_liberty" /></Text>

// worse than we feared
//:scream_cat:

// heating up :thermometer:

// got slammed eating a taco, but why did he tell his friends he was getting a burrito?
//:taco: :burrito:
