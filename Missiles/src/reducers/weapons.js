import {
  ADD_WEAPON,
} from '../actions/weapons';

import _ from 'lodash';

const initialState = [];

// -------------------------------------------------------------------------
//  REDUCER FUNCTION
// -------------------------------------------------------------------------

export default function reducer(weapons = initialState, action) {

  switch (action.type) {

    case ADD_WEAPON:
      return weapons.concat([action.weapon]);

    default:
      return weapons;
  }
}
