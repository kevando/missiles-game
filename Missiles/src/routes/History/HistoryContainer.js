import React, { Component } from 'react';
import { connect } from 'react-redux';

import History from './History';

function mapStateToProps(state) {
  return {
    missiles: state.missiles,
    uid: state.app.authData.uid
  }
}

export default connect(mapStateToProps)(History)
