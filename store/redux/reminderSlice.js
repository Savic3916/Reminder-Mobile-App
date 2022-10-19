import { createSlice } from "@reduxjs/toolkit";

export const reminderSlice = createSlice({
    name: 'Reminder',
    initialState: {
        reminders: [],
        modalDailyReminder: [
            {id: 'c1', title: 'Breakfast', source: require('../../assets/icons/breakfast.png')},
            {id: 'c2', title: 'Reading', source: require('../../assets/icons/book.png')},
            {id: 'c3', title: 'Drink Water', source: require('../../assets/icons/drink-water.png')},
            {id: 'c4', title: 'Exercise', source: require('../../assets/icons/workout.png')},
            {id: 'c5', title: 'Music', source: require('../../assets/icons/music.png')},
            {id: 'c6', title: 'Walking', source: require('../../assets/icons/walk.png')},
            {id: 'c7', title: 'Write', source: require('../../assets/icons/writing.png')},
            {id: 'c8', title: 'Clean', source: require('../../assets/icons/cleaning.png')},
            {id: 'c9', title: 'Laundry', source: require('../../assets/icons/laundry-machine.png')},
            {id: 'c10', title: 'Meditate', source: require('../../assets/icons/yoga.png')},
        ],
        chosenDailyReminder: [],
    },
    reducers: {
        addReminder: (state, action) => {
            state.reminders = action.payload;
        }, 
        deleteReminder: (state, action) => {
            state.reminders = action.payload;
        },
        addDailyReminder: (state, action) => {
            state.chosenDailyReminder = action.payload;
        },
        deleteDailyReminder: (state, action) => {
            state.chosenDailyReminder = action.payload;
        },
        setReminder: (state, action) => {
            state.reminders = action.payload;
        }
    }
});

export const { addReminder, deleteReminder, addDailyReminder, deleteDailyReminder, setReminder } = reminderSlice.actions;
export default reminderSlice.reducer;