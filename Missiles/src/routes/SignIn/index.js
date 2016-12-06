import SignInContainer from './SignInContainer';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as appActions from '../../actions/app'

function mapStateToProps(state) {
  return {
    loggingIn: state.app.loggingIn,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(appActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer)
