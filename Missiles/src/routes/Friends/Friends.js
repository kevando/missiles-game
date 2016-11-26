import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';


import Button from '../../components/Button';
import styles from './styles';
import Routes from '../../config/routes'; // put this in redux?
import { H2 } from '../../components/Text';
import { MyWeapon } from '../../components/Weapons';

import _ from 'lodash';
import moment from 'moment';
import Emoji from 'react-native-emoji';

class Friends extends Component {

  constructor(props) {
    super(props);
    this.state = {missile: null,target: null}

    this.getStyle = this.getStyle.bind(this);
  }


  onTargetPress(target) {
    const { user } = this.props;
    if(target.location && target.uid != user.uid)
      this.setState({target});
    else
      alert('This target is not available for some reason')
  }

  getStyle(target) {
    if(!this.state.target){
      return;
    }
    if(target.username == this.state.target.username){
      return {backgroundColor: 'red'}
    }
  }

  render() {
    const { user, navigator, players, weapons } = this.props;

    const { missile, target } = this.state;


    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerText}>Available Targets</Text>
        </View>

      {
        _.map(players,(target,i) => {
          return (
            <TouchableOpacity  onPress={this.onTargetPress.bind(this,target) }  key={i} >
            <View style={[styles.listItem,this.getStyle(target)]}>
              <H2><Emoji name="smiley" />{`Fire at ${target.username}`}</H2>
              {target.location && user.username == 'kevin' &&
                <Text>{`Last heard from ${moment(target.location.timestamp).fromNow()}`}</Text>
              }

            </View>
            </TouchableOpacity>
          )
        })
      }

      {target &&
        <View style={styles.weapons}>


        {user.weapons ?
          <View>
          <View style={styles.header}>
            <Text style={styles.headerText}>Select a Missile to fire</Text>
          </View>
            {
              _.map(user.weapons,(weapon,i) => {
                return (
                  <TouchableOpacity key={i} onPress={() => navigator.push(Routes.getLaunchRoute(target,weapon)) } >
                    <MyWeapon weapon={weapon}  />
                  </TouchableOpacity>
                )
              })
            }
          </View>
        :
        <View>
          <Text>You have no weapons to choose from</Text>
        </View>
        }


        </View>



      }




      </View>
    );
  }


};


export default Friends;
