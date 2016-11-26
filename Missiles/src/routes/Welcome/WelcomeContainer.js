import React, { Component } from 'react';

import Welcome from './Welcome';


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {AppActions} from '../../actions';

function mapStateToProps(state) {
  return {
    permissions: state.app.permissions,
    // probly some loggingIn state info
    // connectionChecked: state.items.connectionChecked,
    // connected: state.items.connected
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
