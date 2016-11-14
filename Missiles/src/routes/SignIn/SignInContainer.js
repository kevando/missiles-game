import React, { Component } from 'react';

import SignIn from './SignIn';


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as appActions from '../../actions/app'

function mapStateToProps(state) {
  return {
    playersRef: state.firebase.playersRef,
    loggingIn: state.app.loggingIn,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(appActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
