import {
  CONNECTION_ONLINE,
  CONNECTION_OFFLINE,
  SET_AUTH_DATA,
  USER_LOG_OUT,
} from '../actions/app';

import {
  SET_PLAYER_AS_USER,
} from '../actions/players';

const initialState = {
  connectionChecked: false,
  connected: false,
  user: {
    username: null, // app init process requires this to start out as null
    uid: null,
    pushToken: null,
    location: null,
    notifications: false,
    missiles: [],
    balance: 0
  },
  authData: false
};

export default function reducer(app = initialState, action) {

  switch (action.type) {

    case SET_AUTH_DATA:
      const {authData} = action;

      return {
        ...app,
        authData,
        user: {
          ...app.user,
          uid: authData.uid
        }
      }

    case USER_LOG_OUT:
      // const {authData} = action;

      return {
        ...app,
        authData: false,
        user: {}
      }

    case SET_PLAYER_AS_USER:

      return {
        ...app,
        user: {
          ...app.user,
          ...action.player
        }
      }
      // user: {
      //   ...app.user,
      //   username: action.authData.username,
      //   uid: action.authData.uid,
      // }

  case CONNECTION_ONLINE:
    return {
      ...app,
      connectionChecked: true,
      connected: true
    }
  case CONNECTION_OFFLINE:
    return {
      ...app,
      connectionChecked: true,
      connected: false
    }

  default:
    return app
  }

}
