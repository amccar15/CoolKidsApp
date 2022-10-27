import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login.js'
import createAccount from './CreateAccount.js';

const Stack = createNativeStackNavigator();

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
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

