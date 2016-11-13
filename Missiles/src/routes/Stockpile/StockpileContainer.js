import React, { Component } from 'react';

import Stockpile from './Stockpile';


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AuthActions from '../../actions/auth';

function mapStateToProps({missiles}) {
  return {
    // probly some loggingIn state info
    // connectionChecked: state.items.connectionChecked,
    missiles: missiles
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AuthActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Stockpile)
