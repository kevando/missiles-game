import {
  ADD_PLAYER,
  UPDATE_PLAYER,
} from '../actions/players';

import _ from 'lodash';

const initialState = [];

export default function reducer(players = initialState, action) {

// let players;

  switch (action.type) {

    case ADD_PLAYER:

      // alert('add player')
      // return players;
      // players = state.concat([action.player]);

      return players.concat([action.player])


    // case UPDATE_PLAYER:
    //
    //   console.log('UPDATE')
    //   // Find item index using indexOf+find
    //   var index = _.indexOf(state.onlineList, _.find(state.onlineList, {id: action.itemData.id}));
    //
    //   list =
    //   [
    //     ...state.onlineList.slice(0, index),
    //     action.itemData,
    //     ...state.onlineList.slice(index + 1)
    //   ]
    //
    //
    //   return {
    //     ...state,
    //     onlineList: list,
    //     offlineList: list
    //   }

  default:
    return players
  }
}
