import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { ip } from './global.js';
import Login from './Login.js';
import createAccount from './CreateAccount.js';
import homePage from './HomePage.js';
import eventsPage from './EventsPage.js';
import NotificationTab from './NotificationsTab.js';
import Settings from './Settings.js'
import TheEvent from './TheEvent.js';
import EditEvent from './editEvent.js';
import CreateEvent from './CreateEvent.js';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const signOutUser = async (usr) => {
  await axios.post(`http://${ip}:8080/api/auth/signout`, {username: usr}).then((response) => console.log(response.data))
    .catch((e) => console.log(e));
}


function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props}/>
        <SafeAreaView>
          <DrawerItem label="Logout" onPress={() => {props.navigation.popToTop(); signOutUser(props.username)}}
            icon={({ color }) => (
              <IconButton icon='logout' iconColor={color} />
            )}
            labelStyle={{marginLeft: 10, fontFamily: 'ArialRoundedMTBold', fontSize: 15}}
            inactiveTintColor="#333"
          />
        </SafeAreaView>
    </DrawerContentScrollView>
  );
}

const LeftMenuNav = ({route}) => {
  const ROLE = route.params.role
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
        drawerPosition: 'left',
      }}
      initialRouteName="HomePage"
      drawerContent={props => <CustomDrawerContent {...props}/>}
    >
      <Drawer.Screen name='HomePage' component={homePage} 
        options={
          {title: "Home", drawerIcon: ({color}) => (<IconButton icon="home" iconColor={color}/>)}
        }
        initialParams={{accountRole: ROLE}}
      />
      <Drawer.Screen name='Events' component={eventsPage} 
        options={
          {title: "Events", drawerIcon: ({color}) => (<IconButton icon="account-group" iconColor={color}/>)}
        }
        initialParams={{accountRole: ROLE}}
      />
      <Drawer.Screen name='Settings' component={Settings} 
        options={
          {title: "Profile", drawerIcon: ({color}) => (<IconButton icon="account" iconColor={color}/>)}
        } 
        initialParams={{usrPassword: route.params.password}}
      />
      {ROLE == "ADMIN" &&
        <Drawer.Screen name='CreateEvent' component={CreateEvent} 
          options={
            {title: "Create an Event", drawerIcon: ({color}) => (<IconButton icon="pencil" iconColor={color}/>)}
          } 
        />
      }
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
            name='LeftMenuNav'
            component={LeftMenuNav}
            options={{ headerShown: false}}
            initialParams={{username: "", role: "", password: ""}}
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
          <Stack.Screen
            name='EditEvent'
            component={EditEvent}
            initialParams={{eventID: ""}}
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

