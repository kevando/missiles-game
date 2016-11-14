import React from 'react';
import { Image } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import ExNavigator from '@exponent/react-native-navigator';
import Routes from '../../config/routes';
import images from '../../config/images';
import styles from './styles';

class LoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'Launch',
    };
  }

  renderTabItem(title, initialRoute, Icon) {
    const { selectedTab } = this.state;
    const sceneStyle = [];
    if (initialRoute.showNavigationBar !== false) {
      sceneStyle.push({ paddingTop: 64 });
    }

    return (
      <TabNavigator.Item
        selected={selectedTab === title}
        title={title}
        renderIcon={() => <Image style={styles.icon} source={Icon} />}
        renderSelectedIcon={() => (
          <Image
            style={[styles.icon, styles.iconSelected]}
            source={Icon}
          />
        )}
        onPress={() => this.setState({ selectedTab: title })}
      >
        <ExNavigator
          initialRoute={initialRoute}
          style={{ flex: 1 }}
          sceneStyle={sceneStyle}
          showNavigationBar={initialRoute.showNavigationBar}
        />
      </TabNavigator.Item>
    );
  }

  render() {
    return (
      <TabNavigator>
        {this.renderTabItem('News', Routes.getNewsRoute(), images.icons.home)}
        {this.renderTabItem('Stockpile', Routes.getStockpileRoute(), images.icons.home)}
        {this.renderTabItem('Launch', Routes.getFriendsRoute(), images.icons.home)}
        {this.renderTabItem('History', Routes.getHistoryRoute(), images.icons.profile)}
        {this.renderTabItem('Profile', Routes.getProfileRoute(), images.icons.profile)}
        
      </TabNavigator>
    );
  }
  render_test() {
    return (
      <TabNavigator>
        {this.renderTabItem('News', Routes.getNewsRoute(), images.icons.home)}
        {this.renderTabItem('Stockpile', Routes.getStockpileRoute(), images.icons.home)}
        {this.renderTabItem('Market', Routes.getMarketRoute(), images.icons.home)}
        {this.renderTabItem('Maps', Routes.getMapsRoute(), images.icons.home)}
        {this.renderTabItem('Launch', Routes.getLaunchRoute(), images.icons.home)}
        {this.renderTabItem('Launch', Routes.getFriendsRoute(), images.icons.home)}
        {this.renderTabItem('History', Routes.getHistoryRoute(), images.icons.profile)}
        {this.renderTabItem('Profile', Routes.getProfileRoute(), images.icons.profile)}
      </TabNavigator>
    );
  }
}

export default LoggedIn;
