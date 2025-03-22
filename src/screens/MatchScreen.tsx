import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { TabParamList } from '../types/navigation';
import { COLORS } from '../constants/colors';
import { mockUsers } from '../data/mockUsers';
import SearchBar from '../components/SearchBar';
import { Ionicons } from '@expo/vector-icons';

type MatchScreenProps = {
  navigation: NativeStackNavigationProp<TabParamList, 'MatchTab'>;
  route: RouteProp<TabParamList, 'MatchTab'>;
};

const MatchScreen = (props: MatchScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Handle search functionality
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (currentIndex < mockUsers.length) {
      // Handle match if swiped right
      if (direction === 'right') {
        console.log('Matched with:', mockUsers[currentIndex].name);
      }
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleAddFriend = () => {
    console.log('Adding friend:', mockUsers[currentIndex].name);
    setCurrentIndex(prev => prev + 1);
  };

  const renderCurrentUser = () => {
    if (currentIndex >= mockUsers.length) {
      return (
        <View style={styles.noMoreCards}>
          <Text style={styles.noMoreCardsText}>No more players nearby!</Text>
          <Text style={styles.noMoreCardsSubText}>Check back later for more matches</Text>
        </View>
      );
    }

    const user = mockUsers[currentIndex];
    return (
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={{ uri: user.image }}
            style={styles.userImage}
            imageStyle={styles.userImageStyle}
          >
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}, {user.age}</Text>
              <Text style={styles.userSkill}>{user.skillLevel}</Text>
              <Text style={styles.userLocation}>{user.location}</Text>
              <Text style={styles.userBio}>{user.bio}</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={() => setCurrentIndex(prev => prev + 1)}
          >
            <Ionicons name="close" size={24} color={COLORS.white} />
            <Text style={styles.buttonText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.addFriendButton}
            onPress={handleAddFriend}
          >
            <Ionicons name="person-add" size={24} color={COLORS.white} />
            <Text style={styles.buttonText}>Add Friend</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.challengeButton}
          onPress={() => {
            console.log('Challenging:', mockUsers[currentIndex].name);
            // Handle challenge logic here
          }}
        >
          <Ionicons name="trophy" size={24} color={COLORS.white} />
          <Text style={styles.buttonText}>Challenge to a Match</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground 
      source={require('../../assets/pickleball-on-court.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Find a Match</Text>
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmit={handleSearch}
          placeholder="Search for players..."
        />

        <View style={styles.content}>
          {renderCurrentUser()}
        </View>
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
    padding: 10,
    paddingTop: 20,
    alignItems: 'center',
    paddingBottom: 120,
  },
  card: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '80%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },
  userImage: {
    width: '100%',
    height: '100%',
  },
  userImageStyle: {
    borderRadius: 20,
  },
  userInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  userName: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userSkill: {
    color: COLORS.white,
    fontSize: 18,
    marginBottom: 4,
  },
  userLocation: {
    color: COLORS.white,
    fontSize: 16,
    marginBottom: 8,
  },
  userBio: {
    color: COLORS.white,
    fontSize: 14,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6b6b',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addFriendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4cd964',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  challengeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noMoreCardsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 10,
  },
  noMoreCardsSubText: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
  },
});

export default MatchScreen; 