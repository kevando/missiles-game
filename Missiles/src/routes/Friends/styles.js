import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

const window = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: colors.background,
    paddingTop: 50,
  },

  listItem: {
    flex: 1,
    backgroundColor: '#eee',
    borderColor: '#aaa',
    borderBottomWidth:1,
    // borderTopWidth:1,
    paddingVertical: 8,
    paddingHorizontal: 5,
  }

});
