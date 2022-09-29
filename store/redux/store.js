import { configureStore } from "@reduxjs/toolkit";
import reminderReducer from './reminderSlice';

export const store = configureStore({
    reducer: {
        reminder: reminderReducer,
    },
})