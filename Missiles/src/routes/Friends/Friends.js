import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';


import Button from '../../components/Button';
import styles from './styles';
import Routes from '../../config/routes'; // put this in redux?
import { H2 } from '../../components/Text';
import { MyWeapon } from '../../components/Weapons';

import _ from 'lodash';
import moment from 'moment';

class Friends extends Component {

  constructor(props) {
    super(props);
    this.state = {missile: null,target: null}

    this.getStyle = this.getStyle.bind(this);
  }


  onTargetPress(target) {
    // alert(target.username)
    this.setState({target});
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

    // var availableWeapons = [user.weapons[0]];
    // availableWeapons.push(user.weapons[0]);// HARDCODING CAUSE IM DUMB
    // alert(user.weapons[0])
    // console.log(user.weapons)



    return (
      <View style={styles.container}>
      <H2>Available Targets</H2>

      {
        _.map(players,(target,i) => {
          return (
            <TouchableOpacity  onPress={this.onTargetPress.bind(this,target) }  key={i} >
            <View style={[styles.listItem,this.getStyle(target)]}>
              <H2>{`Fire at ${target.username}`}</H2>
              {target.location &&
                <Text>{`Last heard from ${moment(target.location.timestamp).fromNow()}`}</Text>
              }

            </View>
            </TouchableOpacity>
          )
        })
      }

      {target &&
        <View style={styles.weapons}>
        <H2>Available Weapons</H2>

        {user.weapons ?
          <View>
            <Text>Select a Weapon</Text>
            {
              _.map(user.weapons,(weapon,i) => {
                return (
                  <TouchableOpacity key={i} onPress={(target) => navigator.push(Routes.getLaunchRoute(target,weapon)) } >
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
