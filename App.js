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
import TheEvent from './TheEvent.js';
import CreateEvent from './CreateEvent.js';
import HomePage from './HomePage.js';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const MenuNav = ({route}) => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='HomePage' component={homePage} options={{title: "Home"}}/>
      <Drawer.Screen name='Events' component={eventsPage} options={{title: "Events"}}/>
      <Drawer.Screen name='Settings' component={Settings} options={{title: "Profile"}} initialParams={{userID: route.params.accountID}}/>
      <Drawer.Screen name='CreateEvent' component={CreateEvent} options={{title: "Create an Event"}} initialParams={{userID: route.params.accountID}}/>
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
            initialParams={{accountID: ""}}
          />
          <Stack.Screen 
            name='NotificationTab'
            component={NotificationTab}
            options={{title: 'Notification Tab'}}
          />
          <Stack.Screen
            name='TheEvent' 
            component={TheEvent} 
            initialParams={{eventID: ""}}
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

