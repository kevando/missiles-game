import React from 'react';
import { Text, View, Image } from 'react-native';
import Button from '../../components/Button';
// import Avatar from '../../components/Avatar';
import images from '../../config/images';
import { capitalize } from '../../lib/string';
import styles from './styles';

const Profile = (props) => {
  const { user, logOut } = props;

  let username;


  return (
    <View style={styles.container}>
      <Image style={styles.header} source={images.profileHeader} />
      <View style={styles.body}>

        <Text>{capitalize(user.username)}</Text>
        <Button text="Sign Out" onPress={logOut} />
        <Text>If the app is not working very well, check settings and make sure permissions are enabled</Text>
      </View>
    </View>
  );
};

Profile.propTypes = {
  user: React.PropTypes.object,
  signOut: React.PropTypes.func,
};

export default Profile;
