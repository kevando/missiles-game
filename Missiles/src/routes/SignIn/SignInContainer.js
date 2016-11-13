import React, { Component } from 'react';

import SignIn from './SignIn';


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AuthActions from '../../actions/auth'

function mapStateToProps(state) {
  return {
    playersRef: state.firebase.playersRef,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AuthActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
