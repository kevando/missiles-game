import React from 'react';
import Stockpile from '../routes/Stockpile';
import News from '../routes/News';
import Leaderboard from '../routes/Leaderboard';
import Welcome from '../routes/Welcome';
import Profile from '../routes/Profile';
import SignIn from '../routes/SignIn';
import Market from '../routes/Market';
import Friends from '../routes/Friends';
import Maps from '../routes/Maps';
import Launch from '../routes/Launch';
import History from '../routes/History';
import Location from '../routes/Location';

export const routes = {

  // --------------------------------------------------------------------
  // NEWS ROUTE
  // --------------------------------------------------------------------

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
  // LEADERBOARD ROUTE
  // --------------------------------------------------------------------

  getLeaderboardRoute() {
    return {
      renderScene(navigator) {
        return <Leaderboard navigator={navigator} />;
      },

      getTitle() {
        return 'Leaderboard';
      },

      showNavigationBar: false,
    };
  },

  // --------------------------------------------------------------------
  // WELCOME ROUTE
  // --------------------------------------------------------------------

  getWelcomeRoute() {
    return {
      renderScene(navigator) {
        return <Welcome navigator={navigator} />;
      },

      getTitle() {
        return 'Welcome';
      },

      showNavigationBar: false,
    };
  },

  // --------------------------------------------------------------------
  // STOCKPILE ROUTE
  // --------------------------------------------------------------------

  getStockpileRoute() {
    return {
      renderScene(navigator) {
        return <Stockpile navigator={navigator} />;
      },

      getTitle() {
        return 'Stockpile';
      },
      // showNavigationBar: false
    };
  },

  // --------------------------------------------------------------------
  // MARKET ROUTE
  // --------------------------------------------------------------------

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
  // --------------------------------------------------------------------

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
  // --------------------------------------------------------------------

  getLaunchRoute(target, weapon) {
    return {
      renderScene(navigator) {
        return <Launch navigator={navigator} target={target} weapon={weapon} />;
      },

      getTitle() {
        return 'Find your target';
      },

      showNavigationBar: false, // gets inherited?
    };
  },

  // --------------------------------------------------------------------
  // HISTORY ROUTE
  // --------------------------------------------------------------------

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

  // --------------------------------------------------------------------
  // LOCATION ROUTE (For Testing)
  // --------------------------------------------------------------------

  getLocationRoute() {
    return {
      renderScene(navigator) {
        return <Location navigator={navigator} />;
      },

      getTitle() {
        return 'Location Testing';
      },

      showNavigationBar: true,
    };
  },

  // 
  //
  //
  //
  //
  // getMapsRoute() {
  //   return {
  //     renderScene(navigator) {
  //       return <Maps navigator={navigator} />;
  //     },
  //
  //     showNavigationBar: false,
  //   };
  // },

  // --------------------------------------------------------------------
  //  PROFILE ROUTE
  // --------------------------------------------------------------------

  getProfileRoute() {
    return {
      renderScene(navigator) {
        return <Profile navigator={navigator} />;
      },

      showNavigationBar: false,
    };
  },

  // --------------------------------------------------------------------
  //  SIGN IN ROUTE
  // --------------------------------------------------------------------

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
