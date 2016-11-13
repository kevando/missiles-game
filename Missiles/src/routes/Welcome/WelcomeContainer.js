import React, { Component } from 'react';

import Welcome from './Welcome';


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AuthActions from '../../actions/auth'

function mapStateToProps(state) {
  return {
    // probly some loggingIn state info
    // connectionChecked: state.items.connectionChecked,
    // connected: state.items.connected
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AuthActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
