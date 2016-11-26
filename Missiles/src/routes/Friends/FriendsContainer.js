import React, { Component } from 'react';

import Friends from './Friends';


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as playersActions from '../../actions/players';

function mapStateToProps({weapons, app, players}) {
  return {

    weapons,
    user: app.user,
    players

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(playersActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends)
