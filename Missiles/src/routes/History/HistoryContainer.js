import React, { Component } from 'react';

import History from './History';


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as appActions from '../../actions/app'

function mapStateToProps(state) {
  return {
    // probly some loggingIn state info
    // connectionChecked: state.items.connectionChecked,
    // connected: state.items.connected
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(appActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(History)
