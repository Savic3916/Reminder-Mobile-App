import { StyleSheet, View, FlatList } from 'react-native';
import React from 'react';

import { useSelector } from 'react-redux';
import ChosenDailyReminderCard from './ChosenDailyReminderCard';

export default function ChosenDailyReminder() {
    // APP WIDE STATE
    const chosenDailyReminder = useSelector((state) => state.reminder.chosenDailyReminder);

    return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        data={chosenDailyReminder}
        renderItem={(itemData) => <ChosenDailyReminderCard
                                            id={itemData.item.id}
                                            title={itemData.item.title}
                                            source={itemData.item.source}
                                            time={itemData.item.time}
                                            chosenDailyReminder={chosenDailyReminder}
                                  />}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red'
  }
})