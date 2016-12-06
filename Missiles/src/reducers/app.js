import {
  CONNECTION_ONLINE,
  CONNECTION_OFFLINE,
  SET_AUTH_DATA,
  USER_LOGGED_OUT,
  USER_LOGGED_IN,
  USER_LOGGING_IN,
  SET_TOKEN,
  SET_PERMISSIONS,
} from '../actions/app';

import {
  SET_PLAYER_AS_USER,
  APP_INITIALIZED,
} from '../actions/players';

const initialState = {
  connectionChecked: false,
  connected: false,
  permissions: {
    notification: 'unknown',
    location: 'unknown',
    camera: 'unknown',
    photo: 'unknown'
  },
  pushToken: null,
  user: {
    username: null, // app init process requires this to start out as null
    uid: null,
    pushToken: null,
    location: null,

    missiles: [],
    balance: 0
  },
  loggingIn: false,
  initialized: false,
  authData: false,
  availableMissiles: [
    {name: 'Scudd Missile', price: 109, image: 'missile02'},
    {name: 'Short Range', price: 17500, image: 'missile01'},
    {name: 'Max Power', price: 12400, image: 'missile04'},
    {name: 'Torpedo', price: 10420, image: 'missile03'},
  ],
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
        // loggingIn: false,
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
        },
        loggingIn: false,
      }

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

      case SET_TOKEN:
        return {
          ...app,
          pushToken: action.token
          }


      case SET_PERMISSIONS:
        return {
          ...app,
          permissions: action.permissions
          }


  default:
    return app
  }

}
