import { StyleSheet, View, Pressable } from 'react-native';
import React from 'react';

export default function TabBarCircularIconContainer({children, onPress}) {
  return (
    <View>
        <Pressable onPress={onPress}
                   style={({pressed}) => pressed? [styles.container, styles.pressed ] : styles.container}>
            {children}
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      width: 75,
      height: 37,
      borderBottomLeftRadius: 75,
      borderBottomRightRadius: 75,
      backgroundColor: 'transparent',
      top: -10,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 3,
      shadowColor: 'black',
      shadowRadius: 4,
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.5,
      borderWidth: 2,
      borderColor: 'white',
    },
    pressed: {
        opacity: 0.5,
    },
})