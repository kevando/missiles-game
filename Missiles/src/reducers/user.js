import {
  SET_AUTH_DATA
} from '../actions/auth'

import _ from 'lodash';


const initialState = {
  username: 'douche',
  uid: null,
  pushToken: null,
  location: null,
  notifications: false,

}

export default function reducer(user = initialState, action) {

  switch (action.type) {

  case SET_AUTH_DATA:

    return {
      username: action.authData.username,
      uid: action.authData.uid,
    }

  // case UPDATE_ITEM:
  //
  //   console.log('UPDATE')
  //   // Find item index using indexOf+find
  //   var index = _.indexOf(state.onlineList, _.find(state.onlineList, {id: action.itemData.id}));
  //
  //   list =
  //   [
  //     ...state.onlineList.slice(0, index),
  //     action.itemData,
  //     ...state.onlineList.slice(index + 1)
  //   ]
  //
  //
  //   return {
  //     ...state,
  //     onlineList: list,
  //     offlineList: list
  //   }
  // case REMOVE_ITEM:
  //   list = state.onlineList.slice(0)
  //   const index = list.map(i => i.id).indexOf(action.id)
  //   list.splice(index, 1)
  //
  //   return {
  //     ...state,
  //     onlineList: list,
  //     offlineList: list
  //   }
  // case OFFLINE_ITEMS_LOADED:
  //   return {
  //     ...state,
  //     offlineList: action.items,
  //     offlineLoaded: true
  //   }
  // case CONNECTION_CHECKING:
  //   return {
  //     ...state,
  //     connectionChecked: false
  //   }
  // case CONNECTION_CHECKED:
  //   return {
  //     ...state,
  //     connectionChecked: true
  //   }
  // case CONNECTION_ONLINE:
  //   return {
  //     ...state,
  //     connectionChecked: true,
  //     connected: true
  //   }
  // case CONNECTION_OFFLINE:
  //   return {
  //     ...state,
  //     connectionChecked: true,
  //     connected: false
  //   }
  default:
    return user
  }
}
