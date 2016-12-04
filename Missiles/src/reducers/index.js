import { combineReducers } from 'redux'

import app from './app';
import firebase from './firebase'
import weapon from './weapon';
import players from './players';
import missiles from './missiles';

export default combineReducers({


  firebase,
  weapon,
  app,
  players,
  missiles,

});
