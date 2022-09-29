import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { addDailyReminder } from '../../store/redux/reminderSlice';
import Colors from '../../constants/Colors';
import Time from '../AddReminderUI/Time'
import ModalCircularDailyReminderCard from './ModalCircularDailyReminderCard';
import Button from '../AddReminderUI/Button';
import CloseButton from './CloseButton';

export default function ModalCircularDailyReminder({ time, setTime, invalid, setModal }) {

    // APP WIDE STATE
    const allDailyReminderToPick = useSelector((state) => state.reminder.modalDailyReminder);
    const chosenDailyReminder = useSelector((state) => state.reminder.chosenDailyReminder);

    // dispatcher
    const dispatch = useDispatch();

    const [chosenReminder, setChosenReminder] = useState('c1');

    let circularDailyReminder1 = styles.circularDailyReminder1; let image1 = styles.image1;
    let circularDailyReminder2 = styles.circularDailyReminder2; let image2 = styles.image2;
    let circularDailyReminder3 = styles.circularDailyReminder3; let image3 = styles.image3;
    let circularDailyReminder4 = styles.circularDailyReminder4; let image4 = styles.image4;
    let circularDailyReminder5 = styles.circularDailyReminder5; let image5 = styles.image5;
    let circularDailyReminder6 = styles.circularDailyReminder6; let image6 = styles.image6;
    let circularDailyReminder7 = styles.circularDailyReminder7; let image7 = styles.image7;
    let circularDailyReminder8 = styles.circularDailyReminder8; let image8 = styles.image8;
    let circularDailyReminder9 = styles.circularDailyReminder9; let image9 = styles.image9;
    let circularDailyReminder10 = styles.circularDailyReminder10; let image10 = styles.image10;


    if(chosenReminder === 'c1'){
        circularDailyReminder1 = styles.circularDailyReminderPressed;
        image1 = styles.imagePressed;
    }else if(chosenReminder === 'c2'){
        circularDailyReminder2 = styles.circularDailyReminderPressed;
        image2 = styles.imagePressed;
    }else if(chosenReminder === 'c3'){
        circularDailyReminder3 = styles.circularDailyReminderPressed;
        image3 = styles.imagePressed;
    }else if(chosenReminder === 'c4'){
        circularDailyReminder4 = styles.circularDailyReminderPressed;
        image4 = styles.imagePressed;
    }else if(chosenReminder === 'c5'){
        circularDailyReminder5 = styles.circularDailyReminderPressed;
        image5 = styles.imagePressed;
    }else if(chosenReminder === 'c6'){
        circularDailyReminder6 = styles.circularDailyReminderPressed;
        image6 = styles.imagePressed;
    }else if(chosenReminder === 'c7'){
        circularDailyReminder7 = styles.circularDailyReminderPressed;
        image7 = styles.imagePressed;
    }else if(chosenReminder === 'c8'){
        circularDailyReminder8 = styles.circularDailyReminderPressed;
        image8 = styles.imagePressed;
    }else if(chosenReminder === 'c9'){
        circularDailyReminder9 = styles.circularDailyReminderPressed;
        image9 = styles.imagePressed;
    }else if(chosenReminder === 'c10'){
        circularDailyReminder10 = styles.circularDailyReminderPressed;
        image10 = styles.imagePressed;
    }

    // button OK press handler
    const OKpressHandler = () => {
        // filter the pressed reminder based on the one that was chosen
        const clickedReminder = allDailyReminderToPick.filter((reminder) => reminder.id === chosenReminder);
        
        if(time.length < 4){
           // set timeIsValid to false
           setTime((timeObj) => {
            return {...timeObj, isValid: false}
           });
        }else{
            // set timeIsValid back to true
            setTime((timeObj) => {
                return {...timeObj, isValid: true}
            });

        // create a new id
        let id = Math.random();
       
        // add time to this clicked reminder
        const clickedReminderObj = clickedReminder[0];
        const addTimeToObj = {...clickedReminderObj, id: id, time: time};
        const pickedObject = [addTimeToObj];

        // add to the REDUX state by dispatching an action
        dispatch(addDailyReminder([...chosenDailyReminder, ...pickedObject]));

        // reset the time back to an empty string
        setTime((timeObj) => {
            return {...timeObj, value: ''}
        });

        // set modal to false
        setModal(false);
     }        
        
    };
    
  return (
    <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
            <Text style={styles.text}> Pick a reminder </Text>
            <CloseButton setModal={setModal}/>
            <ScrollView style={styles.scrollView}>
                <View style={styles.circularReminderView}>
                    <ModalCircularDailyReminderCard title={allDailyReminderToPick[0].title} source={allDailyReminderToPick[0].source} myStyles={circularDailyReminder1} imageStyle={image1} onPress={() => setChosenReminder('c1')}/>
                    <ModalCircularDailyReminderCard title={allDailyReminderToPick[1].title} source={allDailyReminderToPick[1].source} myStyles={circularDailyReminder2} imageStyle={image2} onPress={() => setChosenReminder('c2')}/>
                    <ModalCircularDailyReminderCard title={allDailyReminderToPick[2].title} source={allDailyReminderToPick[2].source} myStyles={circularDailyReminder3} imageStyle={image3} onPress={() => setChosenReminder('c3')}/>
                    <ModalCircularDailyReminderCard title={allDailyReminderToPick[3].title} source={allDailyReminderToPick[3].source} myStyles={circularDailyReminder4} imageStyle={image4} onPress={() => setChosenReminder('c4')}/>
                </View>
                <View style={styles.circularReminderView}>
                    <ModalCircularDailyReminderCard title={allDailyReminderToPick[4].title} source={allDailyReminderToPick[4].source} myStyles={circularDailyReminder5} imageStyle={image5} onPress={() => setChosenReminder('c5')}/>
                    <ModalCircularDailyReminderCard title={allDailyReminderToPick[5].title} source={allDailyReminderToPick[5].source} myStyles={circularDailyReminder6} imageStyle={image6} onPress={() => setChosenReminder('c6')}/>
                    <ModalCircularDailyReminderCard title={allDailyReminderToPick[6].title} source={allDailyReminderToPick[6].source} myStyles={circularDailyReminder7} imageStyle={image7} onPress={() => setChosenReminder('c7')}/>
                    <ModalCircularDailyReminderCard title={allDailyReminderToPick[7].title} source={allDailyReminderToPick[7].source} myStyles={circularDailyReminder8} imageStyle={image8} onPress={() => setChosenReminder('c8')}/>
                </View>
                <View style={styles.circularReminderView}>
                    <ModalCircularDailyReminderCard title={allDailyReminderToPick[8].title} source={allDailyReminderToPick[8].source} myStyles={circularDailyReminder9} imageStyle={image9} onPress={() => setChosenReminder('c9')}/>
                    <ModalCircularDailyReminderCard title={allDailyReminderToPick[9].title} source={allDailyReminderToPick[9].source} myStyles={circularDailyReminder10} imageStyle={image10} onPress={() => setChosenReminder('c10')}/>
                </View>
           </ScrollView>
           <View style={styles.buttonView}>
                <Time textStyle={styles.buttonText} setTime={setTime} inValid={invalid}/>
                <Button style={styles.button} textStyle={styles.buttonText} onPress={OKpressHandler}>
                    OK
                </Button>
           </View>
        </View>
    </View>
  )
}

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.black,
        opacity: 0.8,
    },
    contentContainer: {
        backgroundColor: Colors.white,
        width: '90%',
        height: '70%',
        padding: 10,
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontFamily: 'raleway',
        paddingBottom: 15,
    },
    scrollView: {
        flex: 1,
     },
    circularReminderView: {
        flexDirection: 'row',
    },
    circularDailyReminder1: {
        height: screenHeight < 713? 50 : 60,
        width: screenHeight < 713? 50 : 60,
        borderRadius: screenHeight < 713? 25 : 30,
        backgroundColor: Colors.lighestGray,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.lighestGray,
        borderWidth: 2,
    },
    circularDailyReminder2: {
        height: screenHeight < 713? 50 : 60,
        width: screenHeight < 713? 50 : 60,
        borderRadius: screenHeight < 713? 25 : 30,
        backgroundColor: Colors.lighestGray,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.lighestGray,
        borderWidth: 2,
    },
    circularDailyReminder3: {
        height: screenHeight < 713? 50 : 60,
        width: screenHeight < 713? 50 : 60,
        borderRadius: screenHeight < 713? 25 : 30,
        backgroundColor: Colors.lighestGray,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.lighestGray,
        borderWidth: 2,
    },
    circularDailyReminder4: {
        height: screenHeight < 713? 50 : 60,
        width: screenHeight < 713? 50 : 60,
        borderRadius: screenHeight < 713? 25 : 30,
        backgroundColor: Colors.lighestGray,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.lighestGray,
        borderWidth: 2,
    },
    circularDailyReminder5: {
        height: screenHeight < 713? 50 : 60,
        width: screenHeight < 713? 50 : 60,
        borderRadius: screenHeight < 713? 25 : 30,
        backgroundColor: Colors.lighestGray,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.lighestGray,
        borderWidth: 2,
    },
    circularDailyReminder6: {
        height: screenHeight < 713? 50 : 60,
        width: screenHeight < 713? 50 : 60,
        borderRadius: screenHeight < 713? 25 : 30,
        backgroundColor: Colors.lighestGray,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.lighestGray,
        borderWidth: 2,
    },
    circularDailyReminder7: {
        height: screenHeight < 713? 50 : 60,
        width: screenHeight < 713? 50 : 60,
        borderRadius: screenHeight < 713? 25 : 30,
        backgroundColor: Colors.lighestGray,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.lighestGray,
        borderWidth: 2,
    },
    circularDailyReminder8: {
        height: screenHeight < 713? 50 : 60,
        width: screenHeight < 713? 50 : 60,
        borderRadius: screenHeight < 713? 25 : 30,
        backgroundColor: Colors.lighestGray,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.lighestGray,
        borderWidth: 2,
    },
    circularDailyReminder9: {
        height: screenHeight < 713? 50 : 60,
        width: screenHeight < 713? 50 : 60,
        borderRadius: screenHeight < 713? 25 : 30,
        backgroundColor: Colors.lighestGray,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.lighestGray,
        borderWidth: 2,
    },
    circularDailyReminder10: {
        height: screenHeight < 713? 50 : 60,
        width: screenHeight < 713? 50 : 60,
        borderRadius: screenHeight < 713? 25 : 30,
        backgroundColor: Colors.lighestGray,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.lighestGray,
        borderWidth: 2,
    },
    image1: {
        width: 22,
        height: 22,
        tintColor: Colors.green,
    },
    image2: {
        width: 22,
        height: 22,
        tintColor: Colors.green,
    },
    image3: {
        width: 22,
        height: 22,
        tintColor: Colors.green,
    },
    image4: {
        width: 22,
        height: 22,
        tintColor: Colors.green,
    },
    image5: {
        width: 22,
        height: 22,
        tintColor: Colors.green,
    },
    image6: {
        width: 22,
        height: 22,
        tintColor: Colors.green,
    },
    image7: {
        width: 22,
        height: 22,
        tintColor: Colors.green,
    },
    image8: {
        width: 22,
        height: 22,
        tintColor: Colors.green,
    },
    image9: {
        width: 22,
        height: 22,
        tintColor: Colors.green,
    },
    image10: {
        width: 22,
        height: 22,
        tintColor: Colors.green,
    },
    circularDailyReminderPressed: {
        height: screenHeight < 713? 50 : 60,
        width: screenHeight < 713? 50 : 60,
        borderRadius: screenHeight < 713? 25 : 30,
        backgroundColor: Colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.lighestGray,
        borderWidth: 2,
    },
    imagePressed: {
        width: 22,
        height: 22,
        tintColor: Colors.white,
    },
    buttonView: {
        width: '60%',
        flexDirection: 'row',
        marginTop: '10%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        backgroundColor: Colors.green,
        padding: 5,
        borderRadius: 30,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 12,
    },
})