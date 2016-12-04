import {
  SET_LOCATION,
  SET_TARGET,
  SET_MISSILE,
} from '../actions/weapon';

import _ from 'lodash';

const initialState = {
  missile: null,
  target: null,
  location: null,
};

// -------------------------------------------------------------------------
//  REDUCER FUNCTION
// -------------------------------------------------------------------------

export default function reducer(weapon = initialState, {type,missile,location,target}) {

  switch (type) {

    case SET_TARGET:
      return {
        ...weapon,
        target
        }

    case SET_LOCATION:
      return {
        ...weapon,
        location
        }

    case SET_MISSILE:
      return {
        ...weapon,
        missile
        }

    default:
      return weapon;
  }
}
