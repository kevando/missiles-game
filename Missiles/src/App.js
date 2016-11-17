import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import Missiles from './Missiles';


const store = configureStore();

class App extends Component {




  render() {
    return (
      <Provider store={store}>
        <Missiles />
      </Provider>
    );
  }
}

export default App;
