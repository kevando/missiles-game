import offline from 'react-native-simple-store'

export const ADD_PLAYER = 'ADD_PLAYER';
export const UPDATE_PLAYER = 'UPDATE_PLAYER';
export const SET_PLAYER_AS_USER = 'SET_PLAYER_AS_USER';
export const APP_INITIALIZED = 'APP_INITIALIZED';

// -------------------------------------------------------------------------
//  ACTION CREATORS
// -------------------------------------------------------------------------


export function listenForPlayers() {
  return (dispatch, getState) => {

    const { dataRef } = getState().firebase;
    const { authData } = getState().app;

    dataRef.child('players').on('child_changed', (snapshot) => {
      

      dispatch({ type: UPDATE_PLAYER, player: snapshot.val() });

      // Now if this new player is our player, Update user in app state
      if(authData.uid == snapshot.key) {
        dispatch({ type: SET_PLAYER_AS_USER, player: snapshot.val() });
      }

    });

    dataRef.child('players').on('child_added', (snapshot) => {

      dispatch({ type: ADD_PLAYER, player: snapshot.val() });

      // Now if this new player is our player, Update user in app state
      if(authData.uid == snapshot.key) {
        dispatch({ type: SET_PLAYER_AS_USER, player: snapshot.val() });
      }


    });

    // Probly want a better place for this
    // this doesnt event work
    dispatch({ type: APP_INITIALIZED });


  }
}
