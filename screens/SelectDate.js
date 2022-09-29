import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import Colors from '../constants/Colors';

export default function SelectDate() {
  return (
    <View style={styles.container}>
      <Text>SelectDate</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  }
})