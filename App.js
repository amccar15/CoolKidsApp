import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import Login from './Login.js'
import createAccount from './CreateAccount.js';
import homePage from './HomePage.js';
import eventsPage from './EventsPage.js';
import NotificationTab from './NotificationsTab.js';
import Settings from './Settings.js'
import TheEvent from './TheEvent.js';
import CreateEvent from './CreateEvent.js';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { Alert } from 'react-native';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const signOutUser = async () => {
  await axios.post('http://192.168.1.117:8080/api/auth/signout').then((response) => console.log(response.data))
    .catch((e) => console.log(e));
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props}/>
        <SafeAreaView>
          <DrawerItem label="Logout" onPress={() => {props.navigation.popToTop(); signOutUser()}}/>
        </SafeAreaView>
    </DrawerContentScrollView>
  );
}

const MenuNav = ({route}) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: "#041598",
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: 10,
          fontFamily: 'ArialRoundedMTBold',
          fontSize: 15,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name='HomePage' component={homePage} 
        options={
          {title: "Home", drawerIcon: ({color}) => (<IconButton icon="home" iconColor={color}/>)}
        }
      />
      <Drawer.Screen name='Events' component={eventsPage} 
        options={
          {title: "Events", drawerIcon: ({color}) => (<IconButton icon="account-group" iconColor={color}/>)}
        }
      />
      <Drawer.Screen name='Settings' component={Settings} 
        options={
          {title: "Profile", drawerIcon: ({color}) => (<IconButton icon="account" iconColor={color}/>)}
        } 
      />
      <Drawer.Screen name='CreateEvent' component={CreateEvent} 
        options={
          {title: "Create an Event", drawerIcon: ({color}) => (<IconButton icon="pencil" iconColor={color}/>)}
        } 
      />
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
            initialParams={{username: ""}}
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

