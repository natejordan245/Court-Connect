import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User } from '../../App';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AddCourtScreen from '../screens/AddCourtScreen';
import TabNavigator from './TabNavigator';

export type MainStackParamList = {
  Login: undefined;
  SignUp: undefined;
  AddCourt: undefined;
  Tabs: {
    user: User;
    fromAddCourt?: boolean;
  };
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="AddCourt" component={AddCourtScreen} />
      <Stack.Screen name="Tabs" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
