import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import MainNavigator from './src/navigation/MainNavigator';

// Define User type for use throughout the app
export interface User {
  uid: string;
  email: string;
  displayName: string;
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <MainNavigator />
    </NavigationContainer>
  );
}