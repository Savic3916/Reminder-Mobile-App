import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';

import DropDownPicker from 'react-native-dropdown-picker';
import Colors from '../../constants/Colors';

export default function DropDownMenu({ value, setValue, values, placeholder, inValid }) {
const [open, setOpen] = useState(false);
const [items, setItems] = useState(values);
    
return (
    <View style={styles.container}>
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder={placeholder}
            showTickIcon={false}
            placeholderStyle={{color: Colors.gray}}
            dropDownDirection="BOTTOM"
            props={{style: [styles.dropDownPickerContainer, inValid && styles.invalidDropDownPickerContainer]}}
            itemProps={{style: styles.itemDropDownPickerContainer}}
            maxHeight={80}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '48.5%',
        marginRight: 8,
    },
    dropDownPickerContainer: {
        borderRadius: 5, 
        borderColor: Colors.lightGray, 
        borderWidth: 2, 
        height: 40, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
        padding: 5,
        backgroundColor: Colors.white,
    },
    invalidDropDownPickerContainer: {
        backgroundColor: Colors.lightRed,
    },
    itemDropDownPickerContainer: {
        paddingVertical: 3,
        paddingHorizontal: 5, 
    },
})