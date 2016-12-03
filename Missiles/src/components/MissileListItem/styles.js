import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export default StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#ddd',
    marginBottom: 1,
    flex: 1
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: '500',
  },
});
