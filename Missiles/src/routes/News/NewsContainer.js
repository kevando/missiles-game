import React, { Component } from 'react';
import { connect } from 'react-redux'

import News from './News';

function mapStateToProps(state) {
  return {
    players: state.players
  }
}

export default connect(mapStateToProps)(News)
