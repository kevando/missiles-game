import offline from 'react-native-simple-store'


export const SET_AUTH_DATA = 'SET_AUTH_DATA';

import firebase from 'firebase';

export function listenForAuthChanges() {
  return dispatch => {

    // Do I need to unsubscribe to this?
  // this.unsubscribe = firebase.auth().onAuthStateChanged(function(authData) {
    firebase.auth().onAuthStateChanged(function(authData) {

      if(authData) {
        dispatch({ type: SET_AUTH_DATA, authData });
        // updateState({authData});
        // setUser(authData);
        // I think this only gets called once, so I should be good to call it here
        // startLocationTracking();
      } else {
        // This will clear the user object and redirect user to signIn page
        dispatch({ type: SET_AUTH_DATA, authData: {} });
      }
    });

  }
}

export function logIn(username) {
  return dispatch => {
    var email = username+"@kevinhabich.com";
    var password = "12345678";

    // const { pushToken } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(authData) {


      // Auth Listener will set user data


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
