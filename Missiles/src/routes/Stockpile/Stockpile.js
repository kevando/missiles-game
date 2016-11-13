import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

import Missile from '../../components/MissileListItem';
import styles from './styles';

import _ from 'lodash';


class Stockpile extends Component {

  constructor(props) {
    super(props);

  }
  componentDidMount() {

    // this is a hack for now
    // eventually current player should be more globally available



  }

  render() {
    const { authData,players } = this.props;

    // THIS IS TMP
    // const player = _.find(players,{uid: authData.uid});

    return (
      <View style={styles.container}>


        <Text>{players.length}</Text>


      </View>
    );
  }


};


export default Stockpile;
