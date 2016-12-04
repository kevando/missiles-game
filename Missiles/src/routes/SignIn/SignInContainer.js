import React, { Component } from 'react'; 
import SignIn from './SignIn';
import FCM from 'react-native-fcm';

export default class SignInContainer extends Component {

  componentDidMount(){
    // push token doesnt get correctly set unless it happens after permissions
    const { setPushToken } = this.props;
    FCM.getFCMToken().then(token => {
        setPushToken(token);
    })
  }

  render(){
    return <SignIn {...this.props} />
  }
}
