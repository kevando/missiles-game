
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {WeaponActions} from '../../actions';


import LaunchContainer from './LaunchContainer';

function mapStateToProps({app, weapon}) {
  return {
    weapon,
    user: app.user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(WeaponActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchContainer)
