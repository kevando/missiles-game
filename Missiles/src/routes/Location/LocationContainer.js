import React, { Component } from 'react';

import Location from './Location';


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {AppActions} from '../../actions';

function mapStateToProps(state) {
  return {
    dataRef: state.firebase.dataRef,
    // probly some loggingIn state info
    // connectionChecked: state.items.connectionChecked,
    // connected: state.items.connected
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Location)
