import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Modal,
  Alert,
  TextInput,
  ScrollView,
  Image
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { TabParamList } from '../types/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<TabParamList, 'HomeTab'>;
  route: RouteProp<TabParamList, 'HomeTab'>;
};

const HomeScreen = (props: HomeScreenProps) => {
  const { user } = props.route.params;
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSignOut = async () => {
    try {
      // Sign out from Firebase
      await signOut(auth);
      setMenuVisible(false);
      // Navigate back to the login screen
      // We need to navigate to the root navigator
      props.navigation.getParent()?.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out');
      console.error(error);
    }
  };

  const handleSearch = () => {
    Alert.alert('Search', `Searching for players matching: ${searchQuery}`);
  };

  const navigateToCourts = () => {
    // @ts-ignore - Ignore type checking for this navigation call
    props.navigation.navigate('CourtsTab');
  };

  const navigateToMatch = () => {
    // @ts-ignore - Ignore type checking for this navigation call
    props.navigation.navigate('MatchTab');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, {user.displayName || user.email}!</Text>
        <TouchableOpacity style={styles.menuButton} onPress={() => setMenuVisible(true)}>
          <View style={styles.hamburgerIcon}>
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Menu Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={handleSignOut}
            >
              <Text style={styles.menuItemText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <ScrollView style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for players..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>🔍</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Access Containers */}
        <View style={styles.quickAccessContainer}>
          {/* Courts Container */}
          <TouchableOpacity 
            style={styles.quickAccessItem}
            onPress={navigateToCourts}
          >
            <View style={styles.quickAccessIconContainer}>
              <Text style={styles.quickAccessIcon}>🏸</Text>
            </View>
            <Text style={styles.quickAccessTitle}>Courts</Text>
            <Text style={styles.quickAccessSubtitle}>Find nearby courts</Text>
          </TouchableOpacity>

          {/* Match Container */}
          <TouchableOpacity 
            style={styles.quickAccessItem}
            onPress={navigateToMatch}
          >
            <View style={styles.quickAccessIconContainer}>
              <Text style={styles.quickAccessIcon}>🤝</Text>
            </View>
            <Text style={styles.quickAccessTitle}>Match</Text>
            <Text style={styles.quickAccessSubtitle}>Find players to play with</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Activity Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityItem}>
            <View style={styles.activityIconContainer}>
              <Text style={styles.activityIcon}>🏆</Text>
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>You won a match!</Text>
              <Text style={styles.activitySubtitle}>vs. John Doe • 2 days ago</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <View style={styles.activityIconContainer}>
              <Text style={styles.activityIcon}>📍</Text>
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>You visited a new court</Text>
              <Text style={styles.activitySubtitle}>Riverside Park • 3 days ago</Text>
            </View>
          </View>
        </View>

        {/* Upcoming Matches Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Upcoming Matches</Text>
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>No upcoming matches</Text>
            <Text style={styles.emptyStateSubtext}>Schedule a match to play with others</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#00a859',
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  menuButton: {
    padding: 5,
  },
  hamburgerIcon: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },
  hamburgerLine: {
    width: '100%',
    height: 2,
    backgroundColor: 'white',
    borderRadius: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuContainer: {
    width: 200,
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 90,
    marginRight: 10,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  searchButton: {
    padding: 10,
  },
  searchButtonText: {
    fontSize: 18,
  },
  quickAccessContainer: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
  },
  quickAccessItem: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  quickAccessIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickAccessIcon: {
    fontSize: 24,
  },
  quickAccessTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  quickAccessSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  sectionContainer: {
    padding: 16,
    backgroundColor: 'white',
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityIcon: {
    fontSize: 20,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#666',
  },
  emptyStateContainer: {
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;
