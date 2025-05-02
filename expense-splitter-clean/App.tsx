import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import GroupScreen from './src/screens/GroupScreen'; // dacă ai deja
import AddGroupScreen from './src/screens/AddGroupScreen';
import CompleteGroupScreen from './src/screens/CompleteGroupScreen'; 
import GroupDetailsScreen from './src/screens/GroupDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddGroup" component={AddGroupScreen} />
        <Stack.Screen name="CompleteGroup" component={CompleteGroupScreen} />
        <Stack.Screen name="Group" component={GroupScreen} />
        <Stack.Screen name="GroupDetails" component={GroupDetailsScreen} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}
