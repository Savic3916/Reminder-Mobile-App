import { StyleSheet, View, Text, Dimensions } from 'react-native'
import React from 'react';

import { useDispatch } from 'react-redux';
import { deleteDailyReminder } from '../../store/redux/reminderSlice';
import ModalCircularDailyReminderCard from './ModalCircularDailyReminderCard';
import Colors from '../../constants/Colors';

export default function ChosenDailyReminderCard({ id, title, source, time, chosenDailyReminder }) {
    // calling a REDUX dispatch function
    const dispatch = useDispatch();

    const pressHandler = (id) => {
       const undeletedDailyReminder = chosenDailyReminder.filter((reminder) => reminder.id !== id);
       dispatch(deleteDailyReminder(undeletedDailyReminder));
    };

  return (
    <View style={styles.container}>
        <ModalCircularDailyReminderCard 
                        title={title} 
                        source={source} 
                        onPress={() => pressHandler(id)} 
                        myStyles={styles.circularDailyReminder} 
                        imageStyle={styles.image}
          />
          <Text style={styles.text}>{time}</Text>
    </View>
  )
}

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    circularDailyReminder: {
      height: screenHeight < 713? 50 : 60,
      width: screenHeight < 713? 50 : 60,
      borderRadius: screenHeight < 713? 25 : 30,
      backgroundColor: Colors.lighestGray,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: Colors.lighestGray,
      borderWidth: 2,
  },
  image: {
      width: 22,
      height: 22,
      tintColor: Colors.green,
  },
  text: {
    marginTop: -10,
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.gray,
  }
})