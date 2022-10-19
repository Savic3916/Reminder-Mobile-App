import axios from "axios";

const BACKEND_URL = 'https://reminder-app-a880c-default-rtdb.firebaseio.com/';

// send a post request to sever
export const storeReminder = async(reminderData) => {
    const response = await axios.post(BACKEND_URL+'reminder.json', reminderData)
    const id = response.data.name;
    return id;
};

// get a request from the sever
export async function getReminder(){
    const response = await axios.get(BACKEND_URL+'reminder.json')
    const reminder = [];
    for(const key in response.data){
        const reminderObj = {
            id: key,
            category: response.data[key].category,
            color: response.data[key].color,
            date: response.data[key].date,
            details: response.data[key].details,
            time: response.data[key].time,
        }
        reminder.push(reminderObj);
    }
    return reminder;
    
}