import offline from 'react-native-simple-store';
import _ from 'lodash';

import { getImpactDistance } from '../lib/maps';
import FirebaseClient from '../FirebaseClient';

export const ADD_MISSILE = 'ADD_MISSILE';


// -------------------------------------------------------------------------
//  ACTION CREATORS
// -------------------------------------------------------------------------


export function listenForMissiles() {
  return (dispatch, getState) => {

    const { dataRef } = getState().firebase;

    dataRef.child('missiles').on('child_added', (snapshot) => {
      dispatch(addMissile(snapshot.val()));
    });

  }
}

export function addMissile(missile) {
  return {
    type: ADD_MISSILE,
    missile,
  }
}

export function fireMissile(missile) {

  return (dispatch, getState) => {

    const { dataRef } = getState().firebase;

    // delete weapon from stockpile
    dataRef
      .child('players')
      .child(missile.sender.uid)
      .child('weapons')
      .child(missile.weapon_key)
      .remove();


    // Add weapon to missile list
    dataRef
      .child('missiles')
      .child(missile.weapon_key)
      .update(missile);

    FirebaseClient.notifyTargetLaunched(missile);
  }
}


export function setImpact(weapon) {

  return (dispatch, getState) => {

    var missile = _.cloneDeep(weapon);

    var impactDistance = getImpactDistance(weapon);
    // alert(impactDistance);
    missile.impactDistance = impactDistance;
    missile.status = 'landed';

    if(impactDistance < 1){
      // if they got close, give them a 40% of getting the frag
      var randomN = Math.random();
      alert(randomN)

      missile.frag = randomN < 0.4 ? true : false;
    }

    if(missile.frag){
      alert('YOUR MISSILE HIT THEM!');
      FirebaseClient.notifyTargetImpact(missile);

    } else {
      alert('YOUR MISSILE MISSED THEM!');
      FirebaseClient.notifyTargetImpact(missile);
    }

    const { dataRef } = getState().firebase;

    // update weapon in missile list
    dataRef
      .child('missiles')
      .child(missile.weapon_key)
      .update(missile);


    // update player scores if its a hit
    if(missile.frag === true){

        dataRef.child('players').child(weapon.target.uid).child('deaths').transaction(function(deaths) {
            if (deaths) {
                deaths = deaths + 1;
            }
            return deaths;
        });
        dataRef.child('players').child(weapon.sender.uid).child('frags').transaction(function(frags) {
            if (frags) {
                frags = frags + 1;
            }
            return frags;
        });
    }
  }
}
