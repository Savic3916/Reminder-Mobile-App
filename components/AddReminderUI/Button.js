import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';

import Colors from '../../constants/Colors';

export default function Button({ onPress, children, style, textStyle }) {
  return (
      <Pressable 
            style={({pressed}) => pressed? [style, styles.pressed] : style}
            android_ripple={{color: Colors.lightGray, borderless: false, radius: 60}}
            onPress={onPress} 
       >
        <Text style={textStyle}>{ children }</Text>
      </Pressable>
  ) 
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.5,
    },
})