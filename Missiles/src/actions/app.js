
import store from 'react-native-simple-store'

export const CONNECTION_ONLINE = 'CONNECTION_ONLINE';
export const CONNECTION_OFFLINE = 'CONNECTION_OFFLINE';
export const UPDATE_PLAYER = 'UPDATE_PLAYER';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const USER_LOGGING_IN = 'USER_LOGGING_IN';
export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_PERMISSIONS = 'SET_PERMISSIONS';


import firebase from 'firebase';




// -------------------------------------------------------------------------
//  ACTION CREATORS
// -------------------------------------------------------------------------


export function checkConnection(connectedRef) {
  return dispatch => {
    connectedRef.on('value', snap => {
      if (snap.val() === true) {
        dispatch({ type: CONNECTION_ONLINE });
      } else {
        dispatch({ type: CONNECTION_OFFLINE });
      }
    })
  }
}

export function listenForAuthChanges() {
  return (dispatch, getState) => {
    firebase.auth().onAuthStateChanged(function(authData) {
      if(authData) {
        dispatch({ type: USER_LOGGED_IN, authData });
        
        // Save uid to disk so bg-geo can grab uid
        store.save('user', { uid: authData.uid });
        // Update player data (back up because logIn is fucking up)
        const { dataRef } = getState().firebase;
        dataRef
          .child('players')
          .child(authData.uid)    // This will overwrite the users balance if it exists, but whatever
          .update({ balance: 101, uid: authData.uid, loggedInAt: Date.now() });

      } else {
        // This will clear the user object and redirect user to signIn page
        dispatch({ type: USER_LOGGED_OUT });
      }
    });
  }
}


export function logIn(username) {
  return (dispatch, getState) => {

    dispatch({ type: USER_LOGGING_IN });

    const { pushToken, permissions } = getState().app;
    const email = username+"@kevinhabich.com"; // tmp
    const password = "12345678"; // tmp

    const { dataRef } = getState().firebase;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(authData) {

      // Something is fucking up here, that is preventing firebase user data from being written
      if(!permissions) alert('Permissions are not set! Please log out and log back in')
      if(!pushToken) alert('Push Token is not set!  Please log out and log back in')
      if(!authData.uid) alert('authData.uid is not set! WTF  Please log out and log back in')


      // Update player data
      dataRef
        .child('players')
        .child(authData.uid)    // This will overwrite the users balance if it exists, but whatever
        .update({ deaths: 0, frags: 0, balance: 100, uid: authData.uid, username, permissions, pushToken, loggedInAt: Date.now() });
    })
    .catch(function(error) {
      console.log('register auth cb error:',error)
    });
  }
}


export function logOut(username) {

  return dispatch => {

    firebase.auth().signOut().then(function() {
      // alert('Signed Out');
    }, function(error) {
      alert('Sign Out Error' + error);
    });

  }
}

export function setPushToken(token){
  return {
    type: SET_TOKEN,
    token,
  }
}

export function setPermissions(permissions){
  return {
    type: SET_PERMISSIONS,
    permissions,
  }
}
