import React from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  containerStyle?: object;
};

const SearchBar = ({ 
  value, 
  onChangeText, 
  onSubmit, 
  placeholder = "Search...",
  containerStyle = {}
}: SearchBarProps) => {
  return (
    <View style={[styles.searchContainer, containerStyle]}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={22} color={COLORS.clayBrown} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor={COLORS.grey}
          value={value}
          onChangeText={onChangeText}
          returnKeyType="search"
          onSubmitEditing={onSubmit}
        />
        {value.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton} 
            onPress={() => onChangeText('')}
          >
            <Ionicons name="close-circle" size={20} color={COLORS.grey} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: COLORS.sageGreen,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 45,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
    fontSize: 22,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.clayBrown,
    paddingVertical: 8,
  },
  clearButton: {
    padding: 5,
  },
});

export default SearchBar; 