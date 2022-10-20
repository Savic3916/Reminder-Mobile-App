import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { deleteReminder } from '../../store/redux/reminderSlice';
import { deleteServerReminder } from '../../util/http';
import Colors from '../../constants/Colors';

export default function ReminderDayCard({ id, details, time }) {
  //APP WIDE STATE
  const reminderState = useSelector((state) => state.reminder.reminders);
  const dispatch = useDispatch();

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
  
  // on press the delete button
  const pressHandler = (id) => {
    dispatch(deleteReminder(reminderState.filter((reminder) => reminder.id !== id))) // delete when pressed
    deleteServerReminder(id);
  };

  return (
    <Pressable 
            style={({pressed}) => pressed? [styles.card, styles.pressed] : styles.card}
            android_ripple={{color: Colors.green, radius: 170 }}
    >
        <View style={styles.topTextContainer}>
            <Text style={styles.detailsTextStyle1}>{text1}</Text>
            <Text style={styles.timeTextStyle}> {myTime} </Text>
        </View>
        <View style={styles.bottomTextContainer}>
          <View style={styles.bottomTextInnerContainer}>
            <Text style={styles.detailsTextStyle2}>{text2}</Text>
          </View>
            <Pressable onPress={() => pressHandler(id)} 
                       style={({pressed}) => pressed && styles.pressed}
            >
                <Image source={require('../../assets/icons/delete.png')} style={styles.deleteImage}/>
            </Pressable>
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    card: {
      width: '98%',
      backgroundColor: Colors.lighestGray,
      borderRadius: 10,
      padding: 10,
      margin: 5,
    },
    pressed: {
      opacity: 0.4,
    },
    topTextContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    bottomTextContainer: {
      flexDirection: 'row',
      marginTop: 5,
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    bottomTextInnerContainer: {
      width: '80%',
    },
    deleteImage: {
      width: 15,
      height: 15,
      marginRight: 10,
      tintColor: Colors.gray
    },
    detailsTextStyle1: {
      fontSize: 15,
      fontWeight: '600',
      letterSpacing: 1,
      fontFamily: 'raleway'
    },
    detailsTextStyle2: {
      fontSize: 12,
      color: Colors.gray,
    },
    timeTextStyle: {
      fontSize: 12,
      color: Colors.gray,
      letterSpacing: 1,
      fontFamily: 'raleway',
    },
});