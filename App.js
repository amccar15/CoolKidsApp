import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './Login.js'
import createAccount from './CreateAccount.js';
import homePage from './HomePage.js';
import eventsPage from './EventsPage.js';
import NotificationTab from './NotificationsTab.js';
import Settings from './Settings.js'
import Messages from './Messages.js';
import CreateEvent from './CreateEvent.js';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const MenuNav = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='HomePage' component={homePage} />
      <Drawer.Screen name='Events' component={eventsPage} />
      <Drawer.Screen name='Settings' component={Settings} />
      <Drawer.Screen name='Messages' component={Messages} />
      <Drawer.Screen name='CreateEvent' component={CreateEvent} />
    </Drawer.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name='Login'
            component={Login}
            options={{title: "Login"}}
          />
          <Stack.Screen 
            name='createAccount'
            component={createAccount}
            options={{title: "Create Account"}}
          />
          <Stack.Screen 
            name='MenuNav'
            component={MenuNav}
            options={{ headerShown: false}}
          />
          <Stack.Screen 
            name='NotificationTab'
            component={NotificationTab}
            options={{title: 'Notification Tab'}}
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

