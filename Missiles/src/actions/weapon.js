// import offline from 'react-native-simple-store'

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
