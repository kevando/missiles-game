import offline from 'react-native-simple-store'


// export const OFFLINE_ITEMS_LOADED = 'OFFLINE_ITEMS_LOADED'
// export const CONNECTION_CHECKING = 'CONNECTION_CHECKING'
// export const CONNECTION_CHECKED = 'CONNECTION_CHECKED'
// export const CONNECTION_ONLINE = 'CONNECTION_ONLINE'
// export const CONNECTION_OFFLINE = 'CONNECTION_OFFLINE'
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
        // Should probly clear user data

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


//
// export function addItem(itemData) {
//   return {
//     type: ADD_ITEM,
//     itemData: itemData
//   }
// }
//
// export function updateItem(itemData) {
//   return {
//     type: UPDATE_ITEM,
//     itemData: itemData
//   }
// }
//
// export function removeItem(id) {
//   return {
//     type: REMOVE_ITEM,
//     id: id
//   }
// }
//
// function offlineItemsLoaded(items) {
//   return {
//     type: OFFLINE_ITEMS_LOADED,
//     items: items
//   }
// }
//
// export function loadOfflineItems() {
//   return dispatch => {
//     offline.get('items').then(items => {
//       dispatch(offlineItemsLoaded(items || []))
//     })
//   }
// }
//
// export function checkConnection() {
//   return dispatch => {
//     dispatch({type: CONNECTION_CHECKING})
//     setTimeout(() => dispatch({type: CONNECTION_CHECKED}), 5000)
//   }
// }
//
// export function goOnline() {
//   return {
//     type: CONNECTION_ONLINE
//   }
// }
//
// export function goOffline() {
//   return {
//     type: CONNECTION_OFFLINE
//   }
// }
