import {
  ADD_PLAYER,
  UPDATE_PLAYER,
} from '../actions/players';

import _ from 'lodash';

const initialState = [];

export default function reducer(players = initialState, action) {

let updatedPlayers;

  switch (action.type) {

    case ADD_PLAYER:

      return players.concat([action.player])


    case UPDATE_PLAYER:

      // Find item index using indexOf+find
      var index = _.indexOf(players, _.find(players, {uid: action.player.uid}));
      // alert(index)
      // return players;

      updatedPlayers =
      [
        ...players.slice(0, index),
        action.player,
        ...players.slice(index + 1)
      ]

      return updatedPlayers



  default:
    return players
  }
}
