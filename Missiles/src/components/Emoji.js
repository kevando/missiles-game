import React from 'react';
import { Text } from 'react-native';
import RNEmoji from 'react-native-emoji';

// @refactor only node-emoji

const Emoji = (props) => {

    const { name='question', style} = props;

    return (
      <Text style={style}>
        <RNEmoji name={name} />
      </Text>
    );
}

export default Emoji;
