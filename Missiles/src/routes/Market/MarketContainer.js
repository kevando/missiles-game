import React, { Component } from 'react';

import Market from './Market';


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  WeaponsActions,
} from '../../actions';


function mapStateToProps({app, weapons}) {
  return {
    weapons,
    user: app.user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(WeaponsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Market)
