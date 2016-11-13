import React, { Component } from 'react';

import Stockpile from './Stockpile';


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as playersActions from '../../actions/players';

function mapStateToProps({missiles, app, players}) {
  return {
    // probly some loggingIn state info
    // connectionChecked: state.items.connectionChecked,
    missiles: missiles,
    authData: app.authData,
    players

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(playersActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Stockpile)
