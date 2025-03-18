import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { TabParamList } from '../types/navigation';
import { COLORS } from '../constants/colors';

type MatchScreenProps = {
  navigation: NativeStackNavigationProp<TabParamList, 'MatchTab'>;
  route: RouteProp<TabParamList, 'MatchTab'>;
};

const MatchScreen = (props: MatchScreenProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find a Match</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Match screen coming soon!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGrey,
  },
  header: {
    backgroundColor: COLORS.sageGreen,
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: COLORS.grey,
  },
});

export default MatchScreen; 