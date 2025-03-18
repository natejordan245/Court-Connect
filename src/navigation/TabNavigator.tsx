import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../types/navigation';
import CourtsScreen from '../screens/CourtsScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { RouteProp } from '@react-navigation/native';
import { MainStackParamList } from './MainNavigator';

type TabNavigatorProps = {
  route: RouteProp<MainStackParamList, 'Tabs'>;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = ({ route }: TabNavigatorProps) => {
  const { user } = route.params;

  return (
    <Tab.Navigator initialRouteName="HomeTab">
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen}
        initialParams={{ user }}
      />
      <Tab.Screen 
        name="CourtsTab" 
        component={CourtsScreen}
        initialParams={{ user }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen}
        initialParams={{ user }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator; 