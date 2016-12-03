import { combineReducers } from 'redux'

import app from './app';
import firebase from './firebase'
import weapons from './weapons';
import players from './players';
import missiles from './missiles';

export default combineReducers({


  firebase,
  weapons,
  app,
  players,
  missiles,

});
