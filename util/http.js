import axios from "axios";

export const storeReminder = (reminderData) => {
    axios.post('https://reminder-app-a880c-default-rtdb.firebaseio.com/reminder.json', reminderData)
}