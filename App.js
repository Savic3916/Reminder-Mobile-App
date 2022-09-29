import { StyleSheet, View, Dimensions, Image, ImageBackground } from 'react-native';
import React from 'react';

import { useFonts } from 'expo-font';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIconContainer from './components/TabNavigatorTab/TabBarIconContainer';
import Colors from './constants/Colors';
import Home from './screens/Home';
import MyReminder from './screens/MyReminder'
import AddReminder from './screens/AddReminder';
import SelectDate from './screens/SelectDate';
import User from './screens/User';
import TabBarCircularIconContainer from './components/TabNavigatorTab/TabBarCircularIconContainer';
import { store } from './store/redux/store';
import { Provider } from 'react-redux';

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'helvetica': require('./assets/fonts/Helvetica-Bold.ttf'),
    'merriweather': require('./assets/fonts/Merriweather-Black.ttf'),
    'raleway': require('./assets/fonts/Raleway-Bold.ttf'),
  }); 
  
  if (!fontsLoaded) {
    return null;
  };

  return (
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator initialRouteName='Home'
                        screenOptions={{
                                        tabBarStyle: styles.tabBarStyle, 
                                        tabBarLabel: '', 
                                        tabBarHideOnKeyboard: true
                                        }}
            >
            <Tab.Screen name='Home' component={Home} 
                        options={{
                          headerShown: false,
                          tabBarIcon: ({focused}) => (
                              <TabBarIconContainer label='Home' 
                                                  source1={require('./assets/icons/home.png')}
                                                  source2={require('./assets/icons/home1.png')}
                                                  focused={focused}/>
                          )}}
            />
            <Tab.Screen name='MyReminders' component={MyReminder}
                        options={{
                          headerTitle: '',
                          headerBackground: () => (
                            <View style={styles.myReminderScreenBackgroundView}>
                              <ImageBackground 
                                            style={styles.myReminderImage} 
                                            source={require('./assets/images/design.png')} 
                                            resizeMode='cover'
                              />
                            </View>
                          ),
                          tabBarIcon: ({focused}) => (
                              <TabBarIconContainer label='Reminders' 
                                                  source1={require('./assets/icons/reminders.png')}
                                                  source2={require('./assets/icons/reminders1.png')}
                                                  focused={focused}
                              />
                        )}}
            />
            <Tab.Screen name='AddReminder' component={AddReminder}
                        options={{
                          headerShown: false,
                          tabBarIcon: () => (
                            <Image style={styles.image} source={require('./assets/icons/plus.png')}/>
                          ),
                          tabBarButton: (props) => (
                            <TabBarCircularIconContainer {...props}/>
                          ),
                          
                        }}
            />
            <Tab.Screen name='SeletDate' component={SelectDate}
                        options={{
                            tabBarIcon: ({focused}) => (
                                <TabBarIconContainer label='Calendar' 
                                                    source1={require('./assets/icons/calendar.png')}
                                                    source2={require('./assets/icons/calendar1.png')}
                                                    focused={focused}/>
                            )}}
            />
            <Tab.Screen name='User' component={User}
                        options={{ 
                            tabBarIcon: ({focused}) => (
                                <TabBarIconContainer label='User' 
                                                    source1={require('./assets/icons/user.png')}
                                                    source2={require('./assets/icons/user1.png')}
                                                    focused={focused}/>
                            )}}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
  );
}

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: 'white',
    position: 'absolute', 
    left: 10, 
    right: 10, 
    bottom: 10, 
    borderRadius: 20, 
    paddingVertical: 10,
    height: screenHeight < 712? 50 : 70,
    elevation: 3,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
  },
  image: {
    height: 50,
    width: 50,
    tintColor: Colors.green,
    top: -8,
  },
  myReminderScreenBackgroundView: {
    flex: 1,
  },
  myReminderImage: {
    flex: 1,
    justifyContent: 'center'
  }
});
