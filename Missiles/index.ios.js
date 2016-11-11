import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import App from './src/containers/App'
import configureStore from './src/store/configureStore'

const store = configureStore()

class Groceries extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('Missiles', () => Groceries)












//----------------------------------------
// This is the exNav boilerplater

// import { AppRegistry } from 'react-native';
// import App from './src';
//
// AppRegistry.registerComponent('Missiles', () => App);


//----------------------------------------
// This was the original missiles app v1

// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
//
// // Map example
// // import App from './app/Maps';
//
// // v2 Missiles
// import App from "./app";
//
// export default class Missiles extends Component {
//   render() {
//     return (<App />);
//   }
// }
//
// AppRegistry.registerComponent('Missiles', () => Missiles);
