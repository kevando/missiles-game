import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Title } from '../../config/styles';

const window = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
  },

  listItem: {
    flex: 1,
    backgroundColor: Colors.white,
    borderColor: Colors.blue,
    borderBottomWidth:1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  name: {
    ...Title,
    fontSize: 24,
    fontWeight: '600'
  },
  label: {
    ...Title,
    fontSize: 13,
    fontWeight: '600',
    marginTop:10,
  },
  value: {
    fontWeight: '100'
  }

});
