import React from 'react';
import Stockpile from '../routes/Stockpile';
import News from '../routes/News';
import Welcome from '../routes/Welcome';
import Profile from '../routes/Profile';
import SignIn from '../routes/SignIn';
import Market from '../routes/Market';

export const routes = {

  // NEWS ROUTE

  getNewsRoute() {
    return {
      renderScene(navigator) {
        return <News navigator={navigator} />;
      },

      getTitle() {
        return 'News';
      },
    };
  },

  // --------------------------------------------------------------------

  // WELCOME ROUTE

  getWelcomeRoute() {
    return {
      renderScene(navigator) {
        return <Welcome navigator={navigator} />;
      },

      getTitle() {
        return 'Welcome';
      },
    };
  },

  // --------------------------------------------------------------------

  // STOCKPILE ROUTE

  getStockpileRoute() {
    return {
      renderScene(navigator) {
        return <Stockpile navigator={navigator} />;
      },

      getTitle() {
        return 'Stockpile';
      },
    };
  },

  // --------------------------------------------------------------------

  // MARKET ROUTE

  getMarketRoute() {
    return {
      renderScene(navigator) {
        return <Market navigator={navigator} />;
      },

      getTitle() {
        return 'Market Place';
      },
    };
  },

  getProfileRoute() {
    return {
      renderScene(navigator) {
        return <Profile navigator={navigator} />;
      },

      showNavigationBar: false,
    };
  },
  getSignInRoute() {
    return {
      renderScene(navigator) {
        return <SignIn navigator={navigator} />;
      },

      showNavigationBar: false,
    };
  },
};

export default routes;
