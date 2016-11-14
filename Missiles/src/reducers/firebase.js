

// This should probably not be a reducer
// But should get included in the store initialization

import { initializeApp } from 'firebase'
import config from '../config/firebase';

const firebaseApp = initializeApp({
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  databaseURL: config.DATABASE_URL,
  storageBucket: config.STORAGE_BUCKET
});

const VERSION = config.VERSION;

const dataRef = firebaseApp.database().ref(`${VERSION}`);
const itemsRef = firebaseApp.database().ref(`${VERSION}/items`);
const logsRef = firebaseApp.database().ref(`${VERSION}/logs`);
const playersRef = firebaseApp.database().ref(`${VERSION}/players`);

const connectedRef = firebaseApp.database().ref('.info/connected');



const initialState = {
  dataRef,
  logsRef,
  connectedRef,
  playersRef,

}

export default function reducer(state = initialState, action) {
  // let list

    return state


  // return state;
}
