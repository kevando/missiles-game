import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';

import styles from './styles';
import Routes from '../../config/routes'; // put this in redux?

import _ from 'lodash';
import moment from 'moment';
import Emoji from 'react-native-emoji';

class Friends extends Component {

  constructor(props) {
    super(props);
    // this.state = {missile: null,target: null}
  }


  render() {
    const { user, navigator, players, weapons, onTargetPress, weapon } = this.props;




    return (
      <View style={styles.container}>
        <ScrollView>

      {
        _.map(players,(target,i) => {
          if(target.location && target.uid != user.uid) {

            return (
              <TouchableOpacity style={styles.listItem} onPress={onTargetPress.bind(this,target) }  key={i} >

                  <Text style={styles.name}>{target.username}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 2}}><Text style={styles.label}>Stockpile: <Text style={styles.value}>{target.weapons ? 'Yes' : 'No'}</Text></Text></View>
                    <View style={{flex: 1}}><Text style={styles.label}>Frags: <Text style={styles.value}>{target.frags}</Text></Text></View>
                    <View style={{flex: 1}}><Text style={styles.label}>Deaths: <Text style={styles.value}>{target.deaths}</Text></Text></View>

                  </View>

              </TouchableOpacity>
            )
          } // do not show self, or users that do not have location set
        })
      }



      </ScrollView>


      </View>
    );
  }


};


export default Friends;
