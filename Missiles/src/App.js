import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import Missiles from './Missiles';


import FCM from "react-native-fcm";

const store = configureStore();

class App extends Component {

  componentDidMount() {
     // not sure exactly how this works
     // but this is required for remote push notifcations
     FCM.requestPermissions();

  }



  render() {
    return (
      <Provider store={store}>
        <Missiles />
      </Provider>
    );
  }
}

export default App;
