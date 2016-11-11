
import React, { Component } from 'react'
import {
  ListView,
  NetInfo,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as AuthActions from './actions/auth';
import * as ItemsActions from './actions/items'; //


import LoggedOut from './layouts/LoggedOut';
import LoggedIn from './layouts/LoggedIn';
import Loading from './components/Loading';


import firebase from 'firebase';

class Missiles extends Component {

  constructor(props) {
    super(props)

    this.state = {
      newItem: ''
    }
  }
  componentDidMount () {

    // how can i combine action creators?
    const { authActions } = this.props;

    authActions.listenForAuthChanges();

    // this.unsubscribe = firebase.auth().onAuthStateChanged(function(authData) {
    //   if(authData) {
    //     console.log('user auth data found in observer',authData)
    //     // updateState({authData});
    //     // setUser(authData);
    //     // I think this only gets called once, so I should be good to call it here
    //     // startLocationTracking();
    //   } else {
    //     // console.log('NO user auth data found in observer')
    //     // updateState({authData: null});
    //   }
    // });
  }

  componentWillMount() {

    // probly want to consider adding back the offline chcks here like in Groceries

    const { connectedRef } = this.props;

    connectedRef.on('value', snap => {
      if (snap.val() === true) {
        this.props.itemsActions.goOnline()
      } else {
        this.props.itemsActions.goOffline()
      }
    })
  }


  render() {
    console.log('Missiles props',this.props);

    const { connected, user } = this.props;

    // TODO there should also be an auth check here, too



    if (!connected) {

      return <Loading />;
    } else if (user.uid) {
      return <LoggedIn />;
    } else {
      return <LoggedOut />;
    }

  }

}



function mapStateToProps(state) {
  return {
    // onlineItems: state.items.onlineList,
    // offlineItems: state.items.offlineList,
    // connectionChecked: state.items.connectionChecked,
    connected: state.items.connected,
    connectedRef: state.firebase.connectedRef,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    itemsActions: bindActionCreators(ItemsActions, dispatch),
    authActions: bindActionCreators(AuthActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Missiles)
