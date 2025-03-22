import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

interface SharePromptProps {
  onPress: () => void;
}

const SharePrompt = ({ onPress }: SharePromptProps) => {
  return (
    <View style={styles.sharePrompt}>
      <View style={styles.sharePromptContent}>
        <View style={styles.userIconPlaceholder}>
          <Ionicons name="person-circle-outline" size={40} color={COLORS.secondary} />
        </View>
        <TouchableOpacity 
          style={styles.shareInput}
          onPress={onPress}
        >
          <Text style={styles.shareInputText}>Share your thoughts...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sharePrompt: {
    padding: 16,
    marginBottom: 12,
  },
  sharePromptContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 25,
    padding: 12,
  },
  userIconPlaceholder: {
    marginRight: 12,
  },
  shareInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    padding: 12,
  },
  shareInputText: {
    color: COLORS.grey,
    fontSize: 16,
  },
});

export default SharePrompt;
