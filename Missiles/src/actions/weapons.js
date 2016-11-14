import offline from 'react-native-simple-store'

export const ADD_WEAPON = 'ADD_WEAPON';
export const BUY_WEAPON = 'BUY_WEAPON';


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

export function addWeapon(weapon) {
  return {
    type: ADD_WEAPON,
    weapon,
  }
}

export function buyWeapon(weapon,coins) {

  return (dispatch, getState) => {

    const { dataRef } = getState().firebase;
    const { uid, balance } = getState().app.user;

    var newBalance = balance - weapon.price;

    if (newBalance < 0)
      alert('Cant buy weapon! This error should never occure in the action');

    // Add weapon to user object
    dataRef
      .child('players')
      .child(uid)
      .child('weapons')
      .push(weapon);

    // Update users balance
    dataRef
      .child('players')
      .child(uid)
      .update({balance: newBalance});

    // Increment purchased counter?

  }
}
