import {
  ADD_MISSILE,
} from '../actions/missiles';

import _ from 'lodash';

const initialState = [];

// -------------------------------------------------------------------------
//  REDUCER FUNCTION
// -------------------------------------------------------------------------

export default function reducer(missiles = initialState, action) {

  switch (action.type) {

    case ADD_MISSILE:
      return missiles.concat([action.missile]);

    default:
      return missiles;
  }
}
