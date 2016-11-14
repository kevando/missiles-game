
import React, { Component } from 'react';

import Profile from './Profile';


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AppActions } from '../../actions';

function mapStateToProps({app}) {
  return {
    user: app.user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
