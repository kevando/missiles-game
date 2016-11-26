import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

const window = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#1E5077',
    borderColor: '#fff',

    borderRightWidth: 5,
    borderLeftWidth: 5,

  },
  top: {
    flex: 5,
    justifyContent: 'flex-start',//'space-between',
    // backgroundColor: 'purple',
  },
  bottom : {
    flex: 2,
    backgroundColor: '#333',
    justifyContent: 'flex-end',
  },

  header: {
    backgroundColor: 'red',
    paddingVertical:2,
    borderColor: '#fff',
    borderTopWidth: 8,
    zIndex:10,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Avenir Next',
    textAlign: 'center',
    letterSpacing:1,
    zIndex:10,
  },

  title: {
    // backgroundColor: 'red',
    paddingTop:10,

  },
  titleMissile: {
    color: '#fff',
    fontSize: 70,
    fontWeight: '900',
    fontFamily: 'Avenir Next',
    textAlign: 'left',
    letterSpacing:3,
    fontStyle: 'italic',
    marginLeft:5,
    marginBottom: -30,
    zIndex:2,
    backgroundColor: 'transparent',
    textShadowOffset: {
      width: 2,
      height: 2
    },
    textShadowRadius: 1,
    textShadowColor: '#555',

  },
  titleNews: {
    backgroundColor: 'transparent',
    color: 'red',
    fontSize: 50,
    fontWeight: '700',
    fontFamily: 'Avenir Next',
    textAlign: 'left',
    letterSpacing:1,
    fontStyle: 'italic',
    marginLeft: 20,
    zIndex:1
  },

  // content

  content: {
    // backgroundColor: 'red',
    paddingTop:10,
    borderColor: 'black',
    borderWidth:5,
    marginHorizontal: 5,
    paddingHorizontal: 15,
    marginBottom: 10,
    flex: 1,
    backgroundColor: 'transparent',
    zIndex: 4,
    flexDirection: 'column'

  },
  contentTitle: {
    color: '#FFE700',
    fontSize: 40,
    fontWeight: '900',
    fontFamily: 'Avenir Next',
    textAlign: 'left',
    letterSpacing:3,
    fontStyle: 'italic',
    marginLeft:5,
    marginTop: 0,
    zIndex:20,
    backgroundColor: 'transparent',
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 10,
    textShadowColor: '#000',
    lineHeight: 50

  },



  faceEmoji: {
    position: 'absolute',
    bottom: 5,
    right:-20,
    backgroundColor: 'transparent',
    fontSize:190,
    zIndex:1,
    // textAlign: 'center'
  },


  // footer

  footerTop: {
    flexWrap: 'nowrap',
    // flex:1,
    // flexDirection: 'row',
  },
  footer: {
    backgroundColor: 'black',
    paddingVertical:2,
    borderColor: '#fff',
    borderTopWidth: 8,
    zIndex:10,
  },

  footerEmojis: {
    // position: 'absolute',
    // bottom: 5,
    // right:-20,
    backgroundColor: 'transparent',
    fontSize:70,
    zIndex:1,
    textAlign: 'left'
  },

  footerTitle: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '500',
    fontFamily: 'Courier',
    textAlign: 'center',
    letterSpacing:4,
    zIndex:10,
  },


  footerText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '300',
    fontFamily: 'Avenir Next',
    textAlign: 'center',
    letterSpacing:4,
    zIndex:10,
  },




});
