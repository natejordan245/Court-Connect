import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { User } from '../../App';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AddCourtScreen from '../screens/AddCourtScreen';
import TabNavigator from './TabNavigator';

export type MainStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Tabs: {
    user: any;
    fromAddCourt?: boolean;
  };
  AddCourt: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: true,
        gestureDirection: 'horizontal'
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen}
        options={{
          animation: 'slide_from_bottom',
          gestureDirection: 'vertical'
        }}
      />
      <Stack.Screen 
        name="Tabs" 
        component={TabNavigator}
        options={{
          animation: 'fade'
        }}
      />
      <Stack.Screen 
        name="AddCourt" 
        component={AddCourtScreen}
        options={{
          animation: 'slide_from_bottom',
          gestureDirection: 'vertical'
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
