import offline from 'react-native-simple-store';
import _ from 'lodash';

import { getImpactDistance } from '../lib/maps';

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
  }
}


export function setImpact(weapon) {

  return (dispatch, getState) => {

    var missile = _.cloneDeep(weapon);

    var impactDistance = getImpactDistance(weapon);
    alert(impactDistance);

    missile.frag = impactDistance < 1 ? true : false;

    missile.impactDistance = impactDistance;
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
