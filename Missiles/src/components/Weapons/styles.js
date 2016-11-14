import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

const window = Dimensions.get('window');

export default StyleSheet.create({

  forSaleWrapper: {
    backgroundColor: '#ddd',//colors.inputBackground,
    width: window.width,
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    borderColor: '#aaa',
    borderBottomWidth: 1
  },



  myWeaponWrapper: {
    backgroundColor: '#ddd',//colors.inputBackground,
    width: window.width,
    // flex: 1,
    justifyContent: 'center',
    padding: 20,
    borderColor: '#aaa',
    borderBottomWidth: 1
  },

});
