import React, { Component } from 'react';

import Launch from './Launch';


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  MissilesActions,
} from '../../actions';


function mapStateToProps({app, weapons}) {
  return {
    weapons,
    user: app.user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MissilesActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Launch)
