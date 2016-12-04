import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export default StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },

    latlng: {
      width: 200,
      alignItems: 'stretch',
    },
    button: {
      width: 80,
      paddingHorizontal: 12,
      paddingVertical: 5,
      alignItems: 'center',
      marginHorizontal: 10,
      backgroundColor: 'red',

    },
    buttonContainer: {
      flexDirection: 'row',
      marginVertical: 20,
      backgroundColor: 'transparent',
    },
    navContainer: {
      flexDirection: 'column',
      marginVertical: 20,
      backgroundColor: '#fff',
      // flex:1,
    },
    distance: {
      fontSize: 26
    },
    plainView: {
      width: 160,
      backgroundColor: 'yellow'
    },


    emoji: {
      fontSize: 30
    }
  });
