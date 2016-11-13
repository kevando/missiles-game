import React from 'react';
import Stockpile from '../routes/Stockpile';
import News from '../routes/News';
import Welcome from '../routes/Welcome';
import Profile from '../routes/Profile';
import SignIn from '../routes/SignIn';

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
  getDetailsRoute() {
    return {
      renderScene(navigator) {
        return <Details navigator={navigator} />;
      },

      getTitle() {
        return 'Details';
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
