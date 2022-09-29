import { StyleSheet, Pressable, View } from 'react-native';
import React from 'react';

import { MaterialIcons } from '@expo/vector-icons';

export default function CloseButton({ setModal }) {
  return (
    <Pressable style={({pressed}) => pressed? [styles.button, styles.pressed] : styles.button}
               onPress={() => setModal(false)}
    >
      <MaterialIcons name="cancel" size={24} color="red" />
    </Pressable>
  )
}

const styles = StyleSheet.create({
    button: {
        position: 'relative',
        top: -38,
        right: '-45%',
    },
    pressed: {
        opacity: 0.5,
    },
})