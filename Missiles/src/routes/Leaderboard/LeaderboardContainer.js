import React, { Component } from 'react';
import { connect } from 'react-redux'

import Leaderboard from './Leaderboard';

function mapStateToProps(state) {
  return {
    players: state.players
  }
}

export default connect(mapStateToProps)(Leaderboard)
