import {
  CONNECTION_ONLINE,
  CONNECTION_OFFLINE,
  SET_AUTH_DATA,
  USER_LOGGED_OUT,
  USER_LOGGED_IN,
  USER_LOGGING_IN,
} from '../actions/app';

import {
  SET_PLAYER_AS_USER,
  APP_INITIALIZED,
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
  loggingIn: false,
  initialized: false,
  authData: false
};

export default function reducer(app = initialState, action) {

  switch (action.type) {

    case APP_INITIALIZED:
      return {
        ...app,
        initialized: true,
      }

    case USER_LOGGED_IN:
      const {authData} = action;

      return {
        ...app,
        authData,
        loggingIn: false,
        user: {
          ...app.user,
          uid: authData.uid
        }
      }

    case USER_LOGGING_IN:
      return {
        ...app,
        loggingIn: true,
      }

    case USER_LOGGED_OUT:
      // const {authData} = action;

      return {
        ...app,
        authData: {},
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
