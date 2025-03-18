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
  ImageBackground
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { TabParamList } from '../types/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { COLORS } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

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

  const handleSuggestFeature = () => {
    setMenuVisible(false);
    Alert.alert(
      'Suggest a Feature',
      'Thank you for your interest! Feature suggestions will be available soon.',
      [{ text: 'OK', style: 'default' }]
    );
  };

  return (
    <ImageBackground 
      source={require('../../assets/pickleball-court.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={22} color={COLORS.clayBrown} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search for players..."
                placeholderTextColor={COLORS.grey}
                value={searchQuery}
                onChangeText={setSearchQuery}
                returnKeyType="search"
                onSubmitEditing={handleSearch}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity 
                  style={styles.clearButton} 
                  onPress={() => setSearchQuery('')}
                >
                  <Ionicons name="close-circle" size={20} color={COLORS.grey} />
                </TouchableOpacity>
              )}
            </View>
          </View>
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
                onPress={handleSuggestFeature}
              >
                <Text style={styles.menuItemText}>Suggest a Feature</Text>
              </TouchableOpacity>
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
          {/* Welcome Message */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome to SportSync</Text>
            <Text style={styles.betaText}>beta</Text>
          </View>

          {/* Quick Access Containers */}
          <View style={styles.quickAccessContainer}>
            <TouchableOpacity 
              style={styles.quickAccessItem}
              onPress={navigateToMatch}
            >
              <View style={styles.quickAccessIconContainer}>
                <Ionicons 
                  name="people" 
                  size={32} 
                  color={COLORS.clayBrown}
                  style={styles.quickAccessIconShadow}
                />
              </View>
              <Text style={styles.quickAccessTitle}>Match</Text>
              <Text style={styles.quickAccessSubtitle}>Find players to play with</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickAccessItem}
              onPress={navigateToCourts}
            >
              <View style={styles.quickAccessIconContainer}>
                <Ionicons 
                  name="location" 
                  size={32} 
                  color={COLORS.clayBrown}
                  style={styles.quickAccessIconShadow}
                />
              </View>
              <Text style={styles.quickAccessTitle}>Courts</Text>
              <Text style={styles.quickAccessSubtitle}>Find nearby courts</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGrey,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  header: {
    marginTop: 50,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  searchContainer: {
    flex: 1,
    marginRight: 10,
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
  menuButton: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  hamburgerIcon: {
    width: 22,
    height: 16,
    justifyContent: 'space-between',
  },
  hamburgerLine: {
    width: '100%',
    height: 2,
    backgroundColor: COLORS.clayBrown,
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
    backgroundColor: COLORS.white,
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
    borderBottomColor: COLORS.lightGrey,
  },
  menuItemText: {
    fontSize: 16,
    color: COLORS.grey,
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  quickAccessContainer: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    flex: 1,
  },
  quickAccessItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
  },
  quickAccessIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  quickAccessIconShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  quickAccessTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
    color: '#4A3C31',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  quickAccessSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A3C31',
    opacity: 0.9,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  welcomeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 0,
    elevation: 0,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '600',
    color: COLORS.clayBrown,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  betaText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: COLORS.clayBrown,
    opacity: 1,
    marginTop: -2,
  },
});

export default HomeScreen;
