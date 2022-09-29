import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React from 'react';

import Colors from '../../constants/Colors';

export default function HomeDailyReminderCard({ id, details, time, date, category, color}) {

  // split the details text based on full stop
  const textArray = details.split('.');
  const text1 = textArray[0] === undefined? '' 
                : textArray[0].length > 40? textArray[0].trim().slice(0, 28).concat('...') 
                : textArray[0].trim();
  
  const text2 = textArray[1] === undefined? '' 
                : textArray[1].trim();

  // change to 12 hour date 
  const firstPart = parseInt(time.slice(0, 2));  // store the first part of time here
  const lastPart = time.slice(3, 5);             // store the last part of time here
  const myTime = time < '12:00'? time.concat(' am') 
                 : (firstPart - 12).toString().concat(":", lastPart, ' pm');

  /* change the colors so users see beautiful colors instead of the primary one they picked
     E.g when the user pick a blue color, let it be a beautiful light blue color
  */
  const confirmedColor = color == 'red'? '#C51111'
                         : color == 'blue'? '#014293'
                         : color == 'yellow'? '#F7DE3A'
                         : color == 'green'? '#9acd32'
                         : Colors.lighestGray
 
  // icon to be used based on the category chosen by the user.
  const confirmedCategory = category == 'work'? require('../../assets/icons/suitcase.png')
                            : category == 'home'? require('../../assets/icons/stay-at-home.png')
                            : category == 'personal'? require('../../assets/icons/personal.png')
                            : category == 'meeting'? require('../../assets/icons/meeting.png')
                            : category == 'workout'? require('../../assets/icons/workout.png')
                            : category == 'music'? require('../../assets/icons/music.png')
                            : null;


  return (
    <View style={styles.card}>
      <View style={[styles.floatingCard, {backgroundColor: confirmedColor}]}>
            <Image 
                style={styles.floaingImage}
                source={confirmedCategory} 
            />
      </View>
      <Text style={styles.text1}>{text1}</Text>
      <Text style={styles.text2}>{text2}</Text>
      <View style={styles.bottomTextContainer}>
            <Image 
                style={[styles.clockImage, {tintColor: confirmedColor}]}
                source={require('../../assets/icons/clock.png')} 
            />
            <Text style={styles.timeTextStyle}>{myTime}</Text>
      </View>
    </View>
  )
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    card: {
        width: screenWidth < 360? 100 : 140,
        borderRadius: 10,
        backgroundColor: Colors.white,
        padding: 10,
        paddingTop: 15,
        marginTop: 20,
        margin: 10,
        marginRight: 5,
        elevation: 3,
        shadowColor: 'black',
        shadowRadius: 4,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.5,
        position: 'relative'
    },
    floatingCard: {
        padding: 5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 35,
        position: 'absolute',
        left: 10,
        top: -12,
    },
    floaingImage: {
        width: 18,
        height: 18,
        tintColor: Colors.white,
    },
    text1: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    text2: {
        fontSize: 12,
        color: Colors.gray,
    },
    bottomTextContainer: {
        flexDirection: 'row',
        marginTop: 7,
        marginBottom: 0,
        alignItems: 'center',
    },
    clockImage: {
        width: 16,
        height: 16,
        marginRight: 7,
    },
    timeTextStyle: {
        fontSize: 12,
        color: Colors.gray,
        fontWeight: 'bold',
    },
})