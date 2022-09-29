import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';

import { getFormattedDate } from '../../util/FormatDate';
import { deleteReminder } from '../../store/redux/reminderSlice';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';

export default function ReminderWeekCard({ id, details, date, time }) {
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

  // use today or tomorrow if date is today or tomorrow
  const today = getFormattedDate(new Date());   // today's date
  const currentDate = getFormattedDate(date);   // date inputted by user
  const currentDateToString = new Date(currentDate).toDateString(); //get inputted date by user in string format
  const currentDay = currentDateToString.slice(0, 3);   //slice the first 3 words out
  const myDate = currentDate === today? 'Today' : currentDay;

  // change to 12 hour date 
  const firstPart = parseInt(time.slice(0, 2));  // store the first part of time here
  const lastPart = time.slice(3, 5);             // store the last part of time here
  const myTime = time < '12:00'? time.concat(' am') 
                 : (firstPart - 12).toString().concat(":", lastPart, ' pm');
  
  // on press the delete button
  const pressHandler = (id) => {
    // delete when pressed
    dispatch(deleteReminder(reminderState.filter((reminder) => reminder.id !== id)))
  };

  return (
    <View>
        <Pressable 
                style={({pressed}) => pressed? [styles.card, styles.pressed] : styles.card}
                android_ripple={{color: Colors.green, radius: 172 }}
        >
            <View style={styles.topTextContainer}>
                <Text style={styles.detailsTextStyle1}>{text1}</Text>
                <Text style={styles.dateTextStyle}> {myDate} </Text>
            </View>
            <View style={styles.bottomTextInnerContainer}>
                <Text style={styles.detailsTextStyle2}>{text2}</Text>
            </View>
            <View style={styles.bottomTextContainer}>
                <Image 
                     style={styles.clockImage}
                     source={require('../../assets/icons/clock.png')} 
                />
                <Text style={styles.timeTextStyle}>{myTime}</Text>
                <Pressable onPress={() => pressHandler(id)} style={({pressed}) => pressed && styles.pressed}>
                    <Image source={require('../../assets/icons/delete.png')} style={styles.deleteImage}/>
                </Pressable>
            </View>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        width: '98%',
        backgroundColor: Colors.lighestGray,
        borderRadius: 10,
        padding: 10,
        margin: 7,
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
    },
    bottomTextInnerContainer: {
        width: '82%',
    },
    clockImage: {
        width: 15,
        height: 15,
        tintColor: Colors.lightGray,
        marginRight: 7,
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
        fontWeight: '400',
    },
    dateTextStyle: {
        fontSize: 12,
        color: Colors.gray,
        letterSpacing: 0.5,
        fontWeight: 'bold'
        
    },
    timeTextStyle: {
        fontSize: 12,
        color: Colors.lightGray,
        marginRight: '70%',
    },
})