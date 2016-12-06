import React from 'react';
import { Text } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import ExNavigator from '@exponent/react-native-navigator';
import Emoji from '../../components/Emoji';
import Routes from '../../config/routes';
import images from '../../config/images';
import styles from './styles';

class LoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'Comrades',
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
        titleStyle={styles.titleStyle}
        selectedTitleStyle={styles.selectedTitleStyle}
        tabStyle={styles.tabStyle}
        renderIcon={() => <Emoji style={styles.emoji} name={Icon} />}
        renderSelectedIcon={() => <Emoji style={[styles.emoji, styles.emojiSelected]} name={Icon} />}
        onPress={() => this.setState({ selectedTab: title })}
      >
        <ExNavigator
          initialRoute={initialRoute}
          style={{ flex: 1 }}
          sceneStyle={sceneStyle}
          navigationBarStyle={styles.navigationBarStyle}
          titleStyle={styles.navTitleStyle}
          barButtonTextStyle={styles.barButtonTextStyle}
          showNavigationBar={initialRoute.showNavigationBar}
        />
      </TabNavigator.Item>
    );
  }

  render() {
    return (
      <TabNavigator tabBarStyle={styles.tabBarStyle} sceneStyle={styles.sceneStyle}>
        {this.renderTabItem('Home', Routes.getProfileRoute(), 'statue_of_liberty')}
        {this.renderTabItem('News', Routes.getNewsRoute(), 'newspaper')}
        {this.renderTabItem('Comrades', Routes.getFriendsRoute(), 'couple')}
        {this.renderTabItem('Stockpile', Routes.getStockpileRoute(), 'crossed_swords')}
      </TabNavigator>
    );
  }
}

export default LoggedIn;
