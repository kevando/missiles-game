import React, { Component } from 'react';

import Market from './Market';


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  MissilesActions,
} from '../../actions';


function mapStateToProps({app, weapon, missiles}) {
  return {
    weapon,
    missiles: app.availableMissiles,
    user: app.user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MissilesActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Market)
