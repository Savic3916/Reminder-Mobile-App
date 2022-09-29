import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';

import Colors from '../../constants/Colors';

export default function DayWeekMonthSwitchView({ time, setTime }) {

    let dayViewStyle = styles.dayViewStyle;
    let weekViewStyle = styles.weekViewStyle;
    let monthViewStyle = styles.monthViewStyle;

    // check if time is either day, week, or month to chnage the style respetively.
    if(time === 'day'){
      dayViewStyle = styles.dayMonthYearViewStylePressed;
    }else if(time === 'week'){
      weekViewStyle = styles.dayMonthYearViewStylePressed;
    }else{
      monthViewStyle = styles.dayMonthYearViewStylePressed;
    }

  return (
    <View style={styles.container}>
        <Pressable 
                style={({pressed}) => pressed? [styles.dayViewStyle, styles.pressed] : dayViewStyle}
                android_ripple={{color: Colors.lightGreen, radius: 50}}
                onPress={() => setTime('day')}
        >
            <Text style={styles.text}> Day </Text> 
        </Pressable>
        <Pressable 
                style={({pressed}) => pressed? [styles.weekViewStyle, styles.pressed] : weekViewStyle}
                android_ripple={{color: Colors.lightGreen, radius: 50}}
                onPress={() => setTime('week')}
        >
            <Text style={styles.text}> Week </Text> 
        </Pressable>
        <Pressable 
                style={({pressed}) => pressed? [styles.monthViewStyle, styles.pressed] : monthViewStyle}
                android_ripple={{color: Colors.lightGreen, radius: 50}}
                onPress={() => setTime('month')}
        >
            <Text style={styles.text}> Month </Text> 
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      width: '100%',
      flexDirection: 'row',
      marginVertical: 10,
      backgroundColor: Colors.lightGray,
      borderRadius: 20,
    },
    dayViewStyle: {
      width: '33.3%',
      borderRadius: 10,
      padding: 3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    weekViewStyle: {
      width: '33.3%',
      borderRadius: 10,
      padding: 3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    monthViewStyle: {
      width: '33.3%',
      borderRadius: 10,
      padding: 3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dayMonthYearViewStylePressed: {
      width: '33.3%',
      padding: 3,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.green,
    },
    pressed: {
      opacity: 0.4,
    },
    text: {
      fontSize: 15,
      color: Colors.white,
      fontWeight: 'bold',
    },
})