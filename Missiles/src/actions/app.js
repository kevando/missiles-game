// import offline from 'react-native-simple-store'


export const CONNECTION_ONLINE = 'CONNECTION_ONLINE';
export const CONNECTION_OFFLINE = 'CONNECTION_OFFLINE';



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
