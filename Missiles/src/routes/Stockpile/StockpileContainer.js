import React, { Component } from 'react';

import Stockpile from './Stockpile';


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as playersActions from '../../actions/players';

function mapStateToProps({weapons, app, players}) {
  return {
    
    weapons,
    user: app.user,
    players

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(playersActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Stockpile)
