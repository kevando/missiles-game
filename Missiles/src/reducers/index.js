import { combineReducers } from 'redux'

import items from './items'
import firebase from './firebase'
import user from './user';

export default combineReducers({
  items,
  firebase,
  user,
})
