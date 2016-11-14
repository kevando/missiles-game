
import offline from 'react-native-simple-store'

export const CONNECTION_ONLINE = 'CONNECTION_ONLINE';
export const CONNECTION_OFFLINE = 'CONNECTION_OFFLINE';
export const SET_AUTH_DATA = 'SET_AUTH_DATA';
export const UPDATE_PLAYER = 'UPDATE_PLAYER';
export const USER_LOG_OUT = 'USER_LOG_OUT';


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

export function listenForAuthChanges(playersRef) {
  return dispatch => {

    // Do I need to unsubscribe to this?
  // this.unsubscribe = firebase.auth().onAuthStateChanged(function(authData) {
    firebase.auth().onAuthStateChanged(function(authData) {

      if(authData) {
        dispatch({ type: SET_AUTH_DATA, authData });

        // dispatch({ type: UPDATE_PLAYER, authData });
        // updateState({authData});
        // setUser(authData);
        // I think this only gets called once, so I should be good to call it here
        // startLocationTracking();
      } else {
        // This will clear the user object and redirect user to signIn page
        dispatch({ type: USER_LOG_OUT });
      }
    });

  }
}


export function logIn(username,playersRef) {
  return dispatch => {
    var email = username+"@kevinhabich.com"; // tmp
    var password = "12345678"; // tmp

    // const { pushToken } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(authData) {
      // Update player data
      playersRef
        .child(authData.uid)
        .update({ username });

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
