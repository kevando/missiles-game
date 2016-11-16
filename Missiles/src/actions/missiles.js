import offline from 'react-native-simple-store'

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

// export function buyWeapon(weapon,coins) {
//
//   return (dispatch, getState) => {
//
//     const { dataRef } = getState().firebase;
//     const { uid, balance } = getState().app.user;
//
//     var newBalance = balance - weapon.price;
//
//     if (newBalance < 0)
//       alert('Cant buy weapon! This error should never occure in the action');
//
//     // Add weapon to user object
//     dataRef
//       .child('players')
//       .child(uid)
//       .child('weapons')
//       .push(weapon);
//
//     // Update users balance
//     dataRef
//       .child('players')
//       .child(uid)
//       .update({balance: newBalance});
//
//     // Increment purchased counter?
//
//   }
// }
