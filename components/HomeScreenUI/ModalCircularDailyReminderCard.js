import { Image, StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';

import Colors from '../../constants/Colors';

export default function ModalCircularDailyReminderCard({ title, source, myStyles, imageStyle, onPress }) {
    return (
    <View style={styles.container}>
       <Pressable 
                style={({pressed}) => pressed? [myStyles, styles.pressed] : myStyles} 
                android_ripple={{color: Colors.green, radius: 25}}
                onPress={onPress}
        >
              <Image source={source} style={imageStyle}/>
          </Pressable>
        <Text style={styles.text}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        alignItems: 'center',
        marginRight: 10,
    },
    pressed: {
        opacity: 0.5,
    },
    text: {
        marginBottom: 10,
        fontSize: 12,
        fontFamily: 'raleway',
        marginTop: 3,
    }
})