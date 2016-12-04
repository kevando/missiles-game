import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

const window = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: colors.background,

  },

  headerText: {
    fontSize: 30,
    color: colors.headerText,
    fontWeight: '600',
    fontStyle: 'italic',
  },

  listItem: {
    flex: 1,
    backgroundColor: '#eee',
    borderColor: '#000',
    borderBottomWidth:1,
    // borderTopWidth:1,
    paddingVertical: 8,
    paddingHorizontal: 5,
  }

});
