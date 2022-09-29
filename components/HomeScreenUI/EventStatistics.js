import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { BarChart } from 'react-native-gifted-charts';
import Colors from '../../constants/Colors';

export default function Hello() {

    const barData = [
        {value: 250, label: 'Mon'},
        {value: 500, label: 'Tue'},
        {value: 745, label: 'Wed'},
        {value: 320, label: 'Thu'},
        {value: 600, label: 'Fri'},
        {value: 256, label: 'Sat'},
        {value: 300, label: 'Sun'},
    ];

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Event Statistics </Text>
      <BarChart
            barWidth={20}
            noOfSections={5}
            barBorderRadius={0}
            frontColor={Colors.green}
            sideColor={Colors.green}
            topColor={Colors.green}
            data={barData}
            yAxisThickness={0}
            xAxisThickness={0}
            height={140}
            initialSpacing={10}
            isThreeD={true}
            isAnimated={true}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    text: {
        fontSize: 18,
        fontFamily: 'raleway',
    }
})