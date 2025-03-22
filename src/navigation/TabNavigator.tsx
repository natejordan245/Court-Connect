import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import CourtsScreen from '../screens/CourtsScreen';
import MatchScreen from '../screens/MatchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { RouteProp } from '@react-navigation/native';
import { MainStackParamList } from './MainNavigator';
import { COLORS } from '../constants/colors';
import { Animated, Platform } from 'react-native';

export type TabParamList = {
  HomeTab: { user: any };
  CourtsTab: { user: any };
  MatchTab: { user: any };
  ProfileTab: { user: any };
};

type TabNavigatorProps = {
  route: RouteProp<MainStackParamList, 'Tabs'>;
};

const Tab = createBottomTabNavigator<TabParamList>();

// Custom animation for screen transitions
const forFade = ({ current }: any) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const TabNavigator = ({ route }: TabNavigatorProps) => {
  const { user } = route.params;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(240, 244, 248, 0.95)',
          height: 75,
          paddingBottom: 15,
          paddingTop: 8,
          position: 'absolute',
          bottom: 20,
          left: 25,
          right: 25,
          borderRadius: 20,
          borderTopWidth: 0,
          elevation: 4,
          shadowColor: COLORS.dark,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.12,
          shadowRadius: 3,
        },
        tabBarActiveTintColor: COLORS.secondary,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: -4,
        },
        tabBarItemStyle: {
          paddingHorizontal: 15,
          paddingVertical: 5,
          marginTop: -4,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        initialParams={{ user }}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused }) => {
            const scale = focused ? 1.2 : 1;
            return (
              <Animated.View style={{ transform: [{ scale }] }}>
                <Ionicons
                  name={focused ? 'home' : 'home-outline'}
                  size={24}
                  color={color}
                  style={focused ? styles.activeIcon : {}}
                />
              </Animated.View>
            );
          },
        }}
      />
      <Tab.Screen
        name="CourtsTab"
        component={CourtsScreen}
        initialParams={{ user }}
        options={{
          tabBarLabel: 'Courts',
          tabBarIcon: ({ color, size, focused }) => {
            const scale = focused ? 1.2 : 1;
            return (
              <Animated.View style={{ transform: [{ scale }] }}>
                <Ionicons
                  name={focused ? 'location' : 'location-outline'}
                  size={24}
                  color={color}
                  style={focused ? styles.activeIcon : {}}
                />
              </Animated.View>
            );
          },
        }}
      />
      <Tab.Screen
        name="MatchTab"
        component={MatchScreen}
        initialParams={{ user }}
        options={{
          tabBarLabel: 'Match',
          tabBarIcon: ({ color, size, focused }) => {
            const scale = focused ? 1.2 : 1;
            return (
              <Animated.View style={{ transform: [{ scale }] }}>
                <Ionicons
                  name={focused ? 'people' : 'people-outline'}
                  size={24}
                  color={color}
                  style={focused ? styles.activeIcon : {}}
                />
              </Animated.View>
            );
          },
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        initialParams={{ user }}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size, focused }) => {
            const scale = focused ? 1.2 : 1;
            return (
              <Animated.View style={{ transform: [{ scale }] }}>
                <Ionicons
                  name={focused ? 'person' : 'person-outline'}
                  size={24}
                  color={color}
                  style={focused ? styles.activeIcon : {}}
                />
              </Animated.View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = {
  activeIcon: {
    transform: [{ scale: 1.1 }],
    textShadowColor: 'rgba(232, 123, 69, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
};

export default TabNavigator; 