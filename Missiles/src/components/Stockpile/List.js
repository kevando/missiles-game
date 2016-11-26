import React from 'react';
import { Image, Text } from 'react-native';

import styles from './styles';

const List = (props) => {

  const { weapons } = props;

  if( !weapons) {
    return(<Text>You have no weapons</Text>)
  } else {
    return(<Text>You have missiles</Text>)
  }


};


export default List;
