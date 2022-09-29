import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react';

export default function Header({ style, text, taskNumber }) {
  return (
    <View style={style}>
      <ImageBackground 
                    style={styles.image} 
                    imageStyle={styles.imageStyle}
                    source={require('../../assets/images/design.png')} 
                    resizeMode='cover'
      >
        <Text style={styles.text}> {text} </Text>
        <Text style={styles.taskText}>  You've got {taskNumber} tasks for today </Text>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    imageStyle: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    taskText: {
        fontSize: 13,
        fontWeight: 'bold',
        lineHeight: 17,
        letterSpacing: 0.5
    }
})