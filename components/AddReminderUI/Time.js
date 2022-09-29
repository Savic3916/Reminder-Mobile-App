import { StyleSheet, View } from "react-native";
import React, { useState } from "react";

import Colors from "../../constants/Colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Button from "./Button";

export default function Time({ textStyle, setTime, inValid }){
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    setTime((timeObj) => {
      return {...timeObj, value: time}
    })
    hideDatePicker();
  };

  return (
    <View>
        <Button 
                onPress={showDatePicker} 
                style={[styles.time, inValid && styles.invalidTime]} 
                textStyle={textStyle}
        >
          Pick Time
        </Button>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  time: {
    paddingVertical: 5, 
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: Colors.green,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  invalidTime: {
    backgroundColor: Colors.lightRed,
  }
});