import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

import Colors from '../../constants/Colors';

export default function TabBarIconContainer({source1, source2, label, focused}) {
  return (
    <View style={styles.container}>
        <Image style={focused? styles.focusedImage : styles.image} source={focused? source1 : source2}/>
        <Text style={focused? styles.focuseText : styles.text}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 20,
        width: 20,
        tintColor: Colors.gray,
    },
    focusedImage: {
        height: 20,
        width: 20,
        tintColor: Colors.green,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 12,
        color: Colors.gray,
    },
    focuseText: {
        fontWeight: 'bold',
        fontSize: 12,
        color: Colors.green,
    },
})