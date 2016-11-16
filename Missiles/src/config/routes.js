import React from 'react';
import Stockpile from '../routes/Stockpile';
import News from '../routes/News';
import Welcome from '../routes/Welcome';
import Profile from '../routes/Profile';
import SignIn from '../routes/SignIn';
import Market from '../routes/Market';
import Friends from '../routes/Friends';
import Maps from '../routes/Maps';
import Launch from '../routes/Launch';
import History from '../routes/History';

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

      showNavigationBar: false,
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

  // --------------------------------------------------------------------

  // FRIENDS ROUTE (Pre Launch)

  getFriendsRoute() {
    return {
      renderScene(navigator) {
        return <Friends navigator={navigator} />;
      },

      getTitle() {
        return 'Choose your target';
      },
      showNavigationBar: false,
    };
  },

  // --------------------------------------------------------------------

  // LAUNCH ROUTE

  getLaunchRoute(target, availableWeapons) {
    return {
      renderScene(navigator) {
        return <Launch navigator={navigator} target={target} availableWeapons={availableWeapons} />;
      },

      getTitle() {
        return 'Find your target';
      },

      showNavigationBar: false, // gets inherited?
    };
  },

  // --------------------------------------------------------------------

  // HISTORY ROUTE

  getHistoryRoute() {
    return {
      renderScene(navigator) {
        return <History navigator={navigator} />;
      },

      getTitle() {
        return 'Missile History';
      },

      showNavigationBar: false,
    };
  },

  getMapsRoute() {
    return {
      renderScene(navigator) {
        return <Maps navigator={navigator} />;
      },

      showNavigationBar: false,
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
