
import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
// import App from './src/containers/App'
import configureStore from './store/configureStore'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import Groceries from '../components/Groceries'
// import Missiles from '../components/Missiles'
import * as ItemsActions from './actions/items'


import LoggedOut from './layouts/LoggedOut';
import LoggedIn from './layouts/LoggedIn';
import Loading from './components/Loading';
import settings from './config/settings';

const store = configureStore()


class App extends Component {


  render() {

    console.log('store',store)
    return (
      <Provider store={store}>
             <Loading />
           </Provider>
    )

    // const { status={}, user, loggingIn } = this.props;
    //
    // if (false || status.connected === false || loggingIn) {
    //
    //   return <Loading />;
    // } else if (true || user !== null) {
    //   return <LoggedIn />;
    // } else {
    //   return <LoggedOut />;
    // }

  }

}



function mapStateToProps(state) {
  return {
    onlineItems: state.items.onlineList,
    offlineItems: state.items.offlineList,
    connectionChecked: state.items.connectionChecked,
    connected: state.items.connected
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ItemsActions, dispatch)
}

// export default connect(mapStateToProps, mapDispatchToProps)(Groceries)
// export default connect(mapStateToProps, mapDispatchToProps)(App)
export default App;
