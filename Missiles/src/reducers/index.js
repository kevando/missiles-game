import { combineReducers } from 'redux'

import app from './app';
import items from './items'
import firebase from './firebase'
import missiles from './missiles';
import players from './players';

export default combineReducers({

  items,
  firebase,
  missiles,
  app,
  players,

})
