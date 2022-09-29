import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { addDays, getFormattedDate } from '../util/FormatDate';
import Colors from '../constants/Colors';
import DayWeekMonthSwitchView from '../components/MyReminderUI/DayWeekMonthSwitchView';
import ReminderDayCard from '../components/MyReminderUI/ReminderDayCard';
import ReminderWeekCard from '../components/MyReminderUI/ReminderWeekCard';
import ReminderMonthCard from '../components/MyReminderUI/ReminderMonthCard';

export default function Settings() {
  // APP WIDE STATE
  const reminderState = useSelector((state) => state.reminder.reminders);
  const [time, setTime] = useState('day');

  // get array of the app state containing only data for today
  const today = getFormattedDate(new Date());
  const todaysReminder = reminderState.filter((reminder) => getFormattedDate(reminder.date) === today);

  // get array of the app state containing only data for this week
  const sevenDays = getFormattedDate(addDays(7));
  const weeksReminder = reminderState.filter((reminder) => getFormattedDate(reminder.date) < sevenDays);

  // get array of the app state containing only data for the month
  const thirtyDays = getFormattedDate(addDays(31));
  const monthsReminder = reminderState.filter((reminder) => getFormattedDate(reminder.date) < thirtyDays);
  
  return (
    <View style={styles.container}>
        <Text style={styles.text}> My Reminders </Text>
        <DayWeekMonthSwitchView time={time} setTime={setTime}/>
        <FlatList
            data={time === 'day'? todaysReminder : time === 'week'? weeksReminder : monthsReminder}
            renderItem={(itemData) => {
              return(
                    time === 'day'?
                      <ReminderDayCard
                                  id={itemData.item.id} 
                                  details={itemData.item.details} 
                                  date={itemData.item.date}
                                  time={itemData.item.time}
                      />
                      : time === 'week'?
                          <ReminderWeekCard
                                    id={itemData.item.id} 
                                    details={itemData.item.details} 
                                    date={itemData.item.date}
                                    time={itemData.item.time}
                          />
                      : 
                          <ReminderMonthCard
                                    id={itemData.item.id} 
                                    details={itemData.item.details} 
                                    date={itemData.item.date}
                                    time={itemData.item.time}
                          />
              )}}
            keyExtractor={(item) => item.id}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 20,
    paddingHorizontal: 10,
    paddingBottom: '22%'
  },
  text: {
    fontFamily: 'helvetica',
    fontSize: 18,
  }
})