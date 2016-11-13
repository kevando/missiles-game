import { combineReducers } from 'redux'

import app from './app';
import items from './items'
import firebase from './firebase'
import user from './user';
import missiles from './missiles';

export default combineReducers({

  items,
  firebase,
  user,
  missiles,
  app,

})
