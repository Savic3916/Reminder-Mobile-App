import { FlatList, StyleSheet, Text, View, Dimensions, Image, Pressable, Modal } from 'react-native';
import React, { useState } from 'react';

import { getFormattedDate } from '../util/FormatDate';
import { useSelector } from 'react-redux';
import Colors from '../constants/Colors';
import Header from '../components/HomeScreenUI/Header';
import HomeDailyReminderCard from '../components/HomeScreenUI/HomeDailyReminderCard';
import ModalCircularDailyReminder from '../components/HomeScreenUI/ModalCircularDailyReminder';
import ChosenDailyReminder from '../components/HomeScreenUI/ChosenDailyReminder';
import EventStatistics from '../components/HomeScreenUI/EventStatistics';


export default function Home() {
  // APP WIDE STATE
  const reminderState = useSelector((state) => state.reminder.reminders);

  // useState
  const [modal, setModal] = useState(false)
   // useState for time
   const [time, setTime] = useState({value: '', isValid: true});

   let myTimeValue = time.value.toString().slice(16, 21) //slice the time out from the date

  // change to 12 hour date 
  const firstPart = parseInt(myTimeValue.slice(0, 2));  // store the first part of time here
  const lastPart = myTimeValue.slice(3, 5);             // store the last part of time here
  const myTime = myTimeValue < '12:00'? myTimeValue.concat(' am') 
                 : (firstPart - 12).toString().concat(":", lastPart, ' pm');
                 

  const today = getFormattedDate(new Date());
  const todaysReminder = reminderState.filter((reminder) => getFormattedDate(reminder.date) === today);
  const numberOfReminder = todaysReminder.length;   //today's task number

  let reminderView;

  if(numberOfReminder === 0){
   reminderView = 
                  <View style={styles.emptyReminderView}>
                    <Text style={styles.emptyReminderText}> You have no tasks for today </Text>
                  </View>
  }else{
    reminderView = 
                  <FlatList
                          horizontal={true}
                          data={todaysReminder}
                          renderItem={(itemData) => (
                                            <HomeDailyReminderCard
                                                id={itemData.item.id} 
                                                details={itemData.item.details} 
                                                date={itemData.item.date}
                                                time={itemData.item.time}
                                                category={itemData.item.category}
                                                color={itemData.item.color}
                                             />
                            )}
                            keyExtractor={(item) => item.id}
                  />
  }

  return (
    <View style={styles.container}>
        <Header 
              style={styles.header}
              text='Hi Savic!'
              taskNumber={numberOfReminder} 
        />
        <View>
            {reminderView}
        </View>
        <View style={styles.dailyReminderView}>
          <Text style={styles.reminderText}> Daily Reminder </Text>
          <Text style={styles.littleReminderText}> Maintain your daily routine </Text>
        </View>
        <View style={styles.circularDailyReminderView}>
            <View style={styles.addNewView}>
                <Pressable 
                      style={({pressed}) => pressed? [styles.circularDailyReminder, styles.pressed] :
                                                                                styles.circularDailyReminder} 
                      android_ripple={{color: Colors.green, radius: 25}}
                      onPress={() => setModal(true)}
                >
                    <Image
                        source={require('../assets/icons/plus1.png')}
                        style={styles.plusImage}
                    />
                </Pressable>
                <Text style={styles.text}> Add new </Text>
            </View>
            <Modal animationType='slide' visible={modal} transparent={true}>
                <ModalCircularDailyReminder 
                                time={myTime} 
                                setTime={setTime} 
                                invalid={!time.isValid} 
                                setModal={setModal}
                  />
            </Modal>
            <ChosenDailyReminder/>
        </View>
        <EventStatistics/>
    </View>
  )
}

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    width: '100%',
    height: '20%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 3,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    borderWidth: 1,
    borderColor: Colors.green,
  },
  emptyReminderView: {
    height: screenHeight < 700? 80 : 120,
    justifyContent: 'center',
    alignItems: 'center',
  },  
  emptyReminderText: {
    color: Colors.gray,
    fontFamily: 'raleway',
    fontSize: 20,
  },
  dailyReminderView: {
    backgroundColor: Colors.white,
    marginHorizontal: 10,
  },
  reminderText: {
    fontSize: 18,
    fontFamily: 'helvetica',
  },
  littleReminderText: {
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: 'bold',
    color: Colors.gray,
  },
  circularDailyReminderView: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 10,
    // backgroundColor: 'green'
  },
  circularDailyReminder: {
    height: screenHeight < 713? 50 : 60,
    width: screenHeight < 713? 50 : 60,
    borderRadius: screenHeight < 713? 25 : 30,
    borderWidth: 1,
    borderColor: Colors.green,
    backgroundColor: '#A0DCCA',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: 'green',
    shadowRadius: 4,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
  },
  plusImage: {
    width: 20,
    height: 20,
    tintColor: Colors.black,
  },
  pressed: {
    opacity: 0.4,
  },
  text: {
    fontSize: 12,
    fontFamily: 'raleway',
    marginTop: 3,
  },
  addNewView: {
    marginHorizontal: 6,
  }
});