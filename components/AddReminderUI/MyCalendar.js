import { StyleSheet, View } from 'react-native';
import React, { useCallback, useMemo } from 'react';

import { Calendar, CalendarUtils } from 'react-native-calendars';
import Colors from '../../constants/Colors';

export default function MyCalendar({ INITIAL_DATE, selected, setSelected, inValid }){
  
    const getDate = (count) => {
        const date = new Date(INITIAL_DATE);
        const newDate = date.setDate(date.getDate() + count);
        return CalendarUtils.getCalendarDateString(newDate);
    };

    const onDayPress = useCallback((day) => {
        setSelected((calendarObj) => {
          return {...calendarObj, value: day.dateString}
        });
    }, []);

    const marked = useMemo(() => {
      return {
          [getDate(-1)]: {
            dotColor: 'red',
            marked: true
          },
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: Colors.green,
            selectedTextColor: Colors.white,
          }};
    }, [selected]);

  return (
        <View style={styles.container}>
          <Calendar
              style={[styles.calendar, inValid && styles.InvalidCalendar]}
              enableSwipeMonths
              current={INITIAL_DATE}
              onDayPress={onDayPress}
              markedDates={marked}
              initialDate={new Date().toDateString()}
              theme={styles.theme}
          />
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 7,
  },
  calendar: {
    borderWidth: 1,
    borderColor: Colors.green,
    borderRadius: 8,
    elevation: 3,
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    
  },
  InvalidCalendar: {
    borderColor: Colors.red,
  },
  theme: {
    calendarBackground: Colors.lightGreen,
    textSectionTitleColor: Colors.black,
    todayTextColor: 'red',
    dayTextColor: Colors.black,
    textDisabledColor: Colors.gray,
    arrowColor: Colors.green,
    monthTextColor: Colors.black,
    textDayHeaderFontFamily: 'helvetica',
    textMonthFontFamily: 'helvetica',
    textDayFontSize: 14,
    textDayFontWeight: 'bold',
  },
});