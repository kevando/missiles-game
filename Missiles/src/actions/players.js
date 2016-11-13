import offline from 'react-native-simple-store'

export const ADD_PLAYER = 'ADD_PLAYER';
export const UPDATE_PLAYER = 'UPDATE_PLAYER';
export const SET_PLAYER_AS_USER = 'SET_PLAYER_AS_USER';


// -------------------------------------------------------------------------
//  ACTION CREATORS
// -------------------------------------------------------------------------


export function listenForPlayers(playersRef) {
  return (dispatch, getState) => {

    const {authData} = getState().app;

    playersRef.on('child_changed', (snapshot) => {



      dispatch({ type: UPDATE_PLAYER, player: snapshot.val() });

      // Now if this new player is our player, Update user in app state
      if(authData.uid == snapshot.key) {
        dispatch({ type: SET_PLAYER_AS_USER, player: snapshot.val() });
      }

    });

    playersRef.on('child_added', (snapshot) => {


      dispatch({ type: ADD_PLAYER, player: snapshot.val() });

      // Now if this new player is our player, Update user in app state
      if(authData.uid == snapshot.key) {
        dispatch({ type: SET_PLAYER_AS_USER, player: snapshot.val() });
      }


    });


  }
}





export function addItem(itemData) {
  return {
    type: ADD_ITEM,
    itemData: itemData
  }
}

export function updateItem(itemData) {
  return {
    type: UPDATE_ITEM,
    itemData: itemData
  }
}

export function removeItem(id) {
  return {
    type: REMOVE_ITEM,
    id: id
  }
}

function offlineItemsLoaded(items) {
  return {
    type: OFFLINE_ITEMS_LOADED,
    items: items
  }
}

export function loadOfflineItems() {
  return dispatch => {
    offline.get('items').then(items => {
      dispatch(offlineItemsLoaded(items || []))
    })
  }
}

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
