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
