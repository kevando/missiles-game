import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Title, Shadow } from '../../config/styles';


var {height, width} = Dimensions.get('window');

export default StyleSheet.create({


  // ------------------------------
  // Navigation Bar

  navigationBarStyle: {
    backgroundColor: Colors.blue,
    borderBottomWidth: 1,
    borderBottomColor: Colors.red
  },
  navTitleStyle: {
    ...Title,
    color: Colors.white,
    fontSize: 22,
    fontWeight: '500'
  },
  barButtonTextStyle: {
    color: Colors.grey,
  },

  // ------------------------------
  // Entire Tab Bar

  sceneStyle: {
    paddingBottom: 70,
  },
  tabBarStyle: {
    height: 70,
    borderColor: Colors.grey,
    borderWidth: 1,
    borderLeftWidth: 0,
  },

  // ------------------------------
  // Tab Item

  tabStyle: {
    backgroundColor: Colors.white,
    borderLeftWidth: 1,
    borderLeftColor: Colors.grey,
  },
  emoji: {
    width: width/5, // not really needed
    paddingBottom:5, // bottom of emoji gets cutoff without this
    textAlign: 'center',
    fontSize:35,
    // backgroundColor: 'yellow',
  },
  emojiSelected: {
    ...Shadow
  },

  // ------------------------------
  // Tab Title

  titleStyle: {
    ...Title,
    fontSize: 13,
    paddingBottom: 3,
    fontWeight: '400',
  },
  selectedTitleStyle: {
    ...Shadow,
    color: Colors.black,
    fontWeight: '600',

  },

});
