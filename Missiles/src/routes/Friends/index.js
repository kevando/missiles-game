import FriendsContainer from './FriendsContainer';
import {WeaponActions} from '../../actions';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function mapStateToProps({weapon, app, players}) {
  return {
    weapon,
    user: app.user,
    players
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(WeaponActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer)
