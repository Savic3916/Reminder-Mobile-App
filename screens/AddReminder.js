import { StyleSheet, View, Text, KeyboardAvoidingView, Dimensions } from 'react-native';
import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addReminder } from '../store/redux/reminderSlice';
import { getFormattedDate } from '../util/FormatDate'
import Colors from '../constants/Colors';
import MyCalendar from '../components/AddReminderUI/MyCalendar';
import Inputs from '../components/AddReminderUI/Inputs';
import DropDownMenu from '../components/AddReminderUI/DropDownMenu';
import Button from '../components/AddReminderUI/Button';
import Time from '../components/AddReminderUI/Time';

export default function AddReminder({ navigation }) {
  
  // APP WIDE STATE
  const reminderState = useSelector((state) => state.reminder.reminders);
  // create a dispatcher
  const dispatch = useDispatch();

  // value for time
  const [time, setTime] = useState({value: '', isValid: true});

  // value for date
  const INITIAL_DATE = new Date().toDateString();
  const [selected, setSelected] = useState({value: INITIAL_DATE, isValid: true});  

  // value for change text
  const [details, setDetails] = useState({value: '', isValid: true});

  // drop down menu category pick
  const [categoryValue, setCategoryValue] = useState(null);
  const [categoryValid, setCategoryValid] = useState(true);

  // drop down menu color pick
  const [colorValue, setColorValue] = useState(null)
  const [colorValid, setColorValid] = useState(true);

  // set details to entered value
  const detailsHandler = (enteredText) => {
    setDetails((details) => {
      return {...details, value: enteredText}
    });
  };

  // drop down category objects
  const category = [
                    {label: 'Work', value: 'work'},
                    {label: 'Home', value: 'home'},
                    {label: 'Personal', value: 'personal'},
                    {label: 'Meeting', value: 'meeting'},
                    {label: 'Workout', value: 'workout'},
                    {label: 'Music', value: 'music'},
                  ];
  const color = [
                  {label: 'Red', value: 'red'}, 
                  {label: 'Blue', value: 'blue'}, 
                  {label: 'Yellow', value: 'yellow'},
                  {label: 'Green', value: 'green'},
                ];

  const buttonPressHandler = () => {
  
    const reminderData = {
      id: Math.random().toString().concat(details.value),
      time: time.value.toString().slice(16, 21),
      date: selected.value,
      details: details.value,
      category: categoryValue,
      color: colorValue,
    };
   
  // check if time chosen by the user is past the CAT(Central African Time) for that particular day
  const today = getFormattedDate(new Date());               // today's date 
  const chosenDate = getFormattedDate(reminderData.date);   // date inputted by user

    /*-------------------------validating the inputs-------------------------*/

  // for time
  let timeIsValid;
    
  //if todays date is the same as the user chosen date, check if the CAT is past the time the user chose
  if(today === chosenDate){
    // get the current CAT time
    const CATTime = new Date().getHours().toString().concat(':', new Date().getMinutes());  
    const userInputtedTime = reminderData.time;  // get the time chosen by the user
        
    // if userInputtedTime is greater than CATTime, then time is invalid
    timeIsValid = reminderData.time.length > 0 && CATTime < userInputtedTime;
  }else{
    timeIsValid = reminderData.time.length > 0;
  };

  // for date
  const dateIsValid = reminderData.date.length > 0 && chosenDate >= today;
    
  // for details
  const detailsIsValid = reminderData.details.trim().length > 0;

  // for category
  const categoryIsValid = reminderData.category !== null;   
  
  // for color
  const colorIsValid = reminderData.color != null;
    
  // if one of them is not correct, pause the app
    if(!timeIsValid || !dateIsValid || !detailsIsValid || !categoryIsValid || !colorIsValid){

      // setting the time validity
      setTime((timeObj) => {
        return {...timeObj, isValid: timeIsValid};
      });

      // setting the date validity
      setSelected((dateObj) => {
        return {...dateObj, isValid: dateIsValid};
      });

      // setting the details validity
      setDetails((detailsObj) => {
        return {...detailsObj, isValid: detailsIsValid};
      });

      // setting the category validity
      setCategoryValid(categoryIsValid);

      // setting the color validity
      setColorValid (colorIsValid);

      return;
    };
      dispatch(addReminder([...reminderState, reminderData]))
      navigation.navigate('MyReminders');
      
      // after navigating, clear all the inputs previously inserted
      // make all data empty to aid the users enter a new one
      setTime({value: '', isValid: true});
      setSelected({value: INITIAL_DATE, isValid: true});
      setDetails({value: '', isValid: true});
      setCategoryValue(null);
      setCategoryValue(null);
  };

  
  // form is invalid
  const formIsInvalid =
                        !time.isValid || 
                        !selected.isValid || 
                        !details.isValid || 
                        !categoryValid || 
                        !colorValid;  

  return (
    <KeyboardAvoidingView 
                          style={styles.container} 
                          behavior='position'
    >
            <Text style={styles.text}> Select Date</Text>
            <MyCalendar 
                        INITIAL_DATE={INITIAL_DATE} 
                        selected={selected.value} 
                        setSelected={setSelected} 
                        inValid={!selected.isValid}
            />
            <View style={styles.timeView}>
              <Text style={styles.text}>Details</Text>
              <Time 
                        textStyle={styles.buttonText} 
                        setTime={setTime} 
                        inValid={!time.isValid}
              />
            </View>
            <Inputs 
                    props={{
                              multiline: true, 
                              value: details.value, 
                              onChangeText: detailsHandler,
                              placeholder: 'Book Tickets. Book tickets for Lagos flight',
                              placeholderTextColor: Colors.lightGray,
                          }}
                    inValid={!details.isValid}
              />
            <View style={styles.dropDownView}>
                 <DropDownMenu
                        value={categoryValue}
                        setValue={setCategoryValue}
                        values={category}
                        placeholder='Select Category'
                        inValid={!categoryValid}
                  />
                  <DropDownMenu
                        value={colorValue}
                        setValue={setColorValue}
                        values={color}
                        placeholder='Select Color'
                        inValid={!colorValid}
                   />
            </View>
            {formIsInvalid &&
                        (<Text style={styles.errorText}> Make sure all data are correctly inputted! </Text>)}
            <Button style={styles.button} textStyle={styles.buttonText} onPress={buttonPressHandler}> 
                  Create Reminder 
            </Button>
    </KeyboardAvoidingView>
  )
}

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: screenHeight < 713? 25 : 33,
    paddingHorizontal: 20,
  },
  header: {
    width: '100%',
    height: '10%',
    elevation: 3,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
  },
  dropDownView: {
    flexDirection: 'row',
    marginTop: screenHeight < 713? 6 : 10,
  },
  button: {
    marginTop: screenHeight < 713? '5%' : '6%',
    backgroundColor: Colors.green,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  timeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  errorText: {
    textAlign: 'center',
    color: Colors.red,
  },
  reminderText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
  },
})