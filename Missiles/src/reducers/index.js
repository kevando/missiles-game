import { combineReducers } from 'redux'

import items from './items'
import firebase from './firebase'
import user from './user';
import missiles from './missiles';

export default combineReducers({
  items,
  firebase,
  user,
  missiles
})
