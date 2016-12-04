import _ from 'lodash';

import { getImpactDistance } from '../lib/maps';
import FirebaseClient from '../FirebaseClient';

export const SET_TARGET = 'SET_TARGET';
export const SET_LOCATION = 'SET_LOCATION';
export const SET_MISSILE = 'SET_MISSILE';


// -------------------------------------------------------------------------
//  ACTION CREATORS
// -------------------------------------------------------------------------


export function listenForWeapons() {
  return (dispatch, getState) => {

    const { dataRef } = getState().firebase;

    dataRef.child('weapons').on('child_added', (snapshot) => {
      dispatch(addWeapon(snapshot.val()));
    });

  }
}

export function setTarget(target) {
  return {
    type: SET_TARGET,
    target,
  }
}

export function setLocation(location) {
  return {
    type: SET_LOCATION,
    location,
  }
}

export function setMissile(missile) {
  return {
    type: SET_MISSILE,
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

      missile.frag = randomN < 0.4 ? true : false;
    }

    if(missile.frag){
      alert('You HIT '+weapon.target.username+'!');
      FirebaseClient.notifyTargetImpact(missile);

    } else {
      alert('You MISSED '+weapon.target.username+'!');
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
