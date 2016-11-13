import {
  CONNECTION_ONLINE,
  CONNECTION_OFFLINE,
  SET_AUTH_DATA,
} from '../actions/app';

import {
  SET_PLAYER_AS_USER,
} from '../actions/players';

const initialState = {
  connectionChecked: false,
  connected: false,
  user: {
    username: 'douche',
    uid: null,
    pushToken: null,
    location: null,
    notifications: false,
    missiles: [],
    coins: 0
  },
  authData: {}
};

export default function reducer(app = initialState, action) {

  switch (action.type) {

    case SET_AUTH_DATA:

      return {
        ...app,
        authData: action.authData,
      }

    case SET_PLAYER_AS_USER:

      return {
        ...app,
        user: action.player
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
