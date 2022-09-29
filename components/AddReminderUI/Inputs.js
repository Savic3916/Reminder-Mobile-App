import { StyleSheet, View, Text, TextInput } from 'react-native';
import React from 'react';

import Colors from '../../constants/Colors';

export default function Inputs({ props, inValid }) {
  return (
    <View style={styles.container}>
        <TextInput style={[styles.input, inValid && styles.invalidInput]} {...props}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
    },
    input: {
      minHeight: 60,
      maxHeight: 60,
      borderRadius: 10,
      borderColor: Colors.lightGray,
      borderWidth: 1,
      padding: 10,
      textAlignVertical: 'top',
      backgroundColor: Colors.white,
      fontSize: 16,
      elevation: 3,
      shadowColor: 'black',
      shadowRadius: 3,
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.5,
    },
    invalidInput: {
      backgroundColor: Colors.lightRed,
    }
})