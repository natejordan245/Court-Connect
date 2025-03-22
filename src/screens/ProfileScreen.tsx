import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { TabParamList } from '../types/navigation';
import { auth } from '../config/firebase';
import { getUserProfile, updateUserProfile } from '../services/userService';
import { signOut } from 'firebase/auth';
import { UserProfile } from '../types/User';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { mockProfiles } from '../data/mockProfiles';

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<TabParamList, 'ProfileTab'>;
  route: RouteProp<TabParamList, 'ProfileTab'>;
};

const ProfileScreen = (props: ProfileScreenProps) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('No user logged in');
      }

      // Use mock profile data for now
      const userProfile = mockProfiles['default'];
      setProfile(userProfile);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile');
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    props.navigation.getParent()?.navigate('EditProfile', {
      profile: profile,
    });
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(auth);
              // Navigation will be handled by the auth state listener in App.tsx
            } catch (err) {
              console.error('Error signing out:', err);
              Alert.alert('Error', 'Failed to sign out');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleSettingsPress = () => {
    props.navigation.getParent()?.navigate('Settings');
  };

  if (loading) {
    return (
      <ImageBackground 
        source={require('../../assets/pickleball-on-court.jpg')}
        style={styles.container}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.secondary} />
          </View>
        </View>
      </ImageBackground>
    );
  }

  if (error || !profile) {
    return (
      <ImageBackground 
        source={require('../../assets/pickleball-on-court.jpg')}
        style={styles.container}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error || 'Profile not found'}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={fetchProfile}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground 
      source={require('../../assets/pickleball-on-court.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.settingsButton}
              onPress={handleSettingsPress}
            >
              <MaterialIcons name="settings" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileSection}>
            <Image
              source={
                profile.photoURL
                  ? { uri: profile.photoURL }
                  : require('../../assets/default-avatar.png')
              }
              style={styles.profileImage}
            />
            <Text style={styles.name}>{profile.displayName}</Text>
            <Text style={styles.location}>{profile.location}</Text>

            <TouchableOpacity 
              style={styles.editButton}
              onPress={handleEditProfile}
            >
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsSection}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profile.matchesPlayed || 0}</Text>
              <Text style={styles.statLabel}>Matches</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profile.wins || 0}</Text>
              <Text style={styles.statLabel}>Wins</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {profile.matchesPlayed ? ((profile.wins || 0) / profile.matchesPlayed * 100).toFixed(1) : '0.0'}%
              </Text>
              <Text style={styles.statLabel}>Win Rate</Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <MaterialIcons name="sports-tennis" size={24} color="#666" />
              <Text style={styles.infoText}>
                {profile.skillLevel || 'Not specified'} • {profile.playStyle || 'Not specified'}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <MaterialIcons name="schedule" size={24} color="#666" />
              <Text style={styles.infoText}>
                {profile.availability || 'Availability not specified'}
              </Text>
            </View>
            {profile.bio && (
              <View style={styles.bioSection}>
                <Text style={styles.bioTitle}>About</Text>
                <Text style={styles.bioText}>{profile.bio}</Text>
              </View>
            )}
          </View>

          <TouchableOpacity 
            style={styles.signOutButton}
            onPress={handleSignOut}
          >
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
          <View style={styles.tabBarSpacing} />
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  header: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: 120,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  settingsButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(43, 109, 152, 0.3)',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: -60,
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
    color: COLORS.secondary,
  },
  location: {
    fontSize: 16,
    color: COLORS.grey,
    marginTop: 4,
  },
  editButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 16,
  },
  editButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingVertical: 20,
    marginTop: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.grey,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(43, 109, 152, 0.3)',
  },
  infoSection: {
    backgroundColor: COLORS.white,
    padding: 20,
    marginTop: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    color: COLORS.grey,
    marginLeft: 12,
  },
  bioSection: {
    marginTop: 8,
  },
  bioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: COLORS.secondary,
  },
  bioText: {
    fontSize: 16,
    color: COLORS.grey,
    lineHeight: 24,
  },
  signOutButton: {
    backgroundColor: '#f44336',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  signOutButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.grey,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabBarSpacing: {
    height: 120,
  },
});

export default ProfileScreen; 