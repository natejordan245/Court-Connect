import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  Alert,
  ScrollView,
  ImageBackground,
  Text
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { TabParamList } from '../types/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { COLORS } from '../constants/colors';
import Menu from '../components/Menu';
import { Ionicons } from '@expo/vector-icons';
import { mockPosts } from '../data/mockPosts';
import PostCard from '../components/PostCard';
import SharePrompt from '../components/SharePrompt';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<TabParamList, 'HomeTab'>;
  route: RouteProp<TabParamList, 'HomeTab'>;
};

const HomeScreen = (props: HomeScreenProps) => {
  const { user } = props.route.params;
  const [menuVisible, setMenuVisible] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setMenuVisible(false);
      props.navigation.getParent()?.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out');
      console.error(error);
    }
  };

  const handleSuggestFeature = () => {
    setMenuVisible(false);
    Alert.alert(
      'Suggest a Feature',
      'Thank you for your interest! Feature suggestions will be available soon.',
      [{ text: 'OK', style: 'default' }]
    );
  };

  const handleLike = (postId: string) => {
    // Handle like action
    console.log('Liked post:', postId);
  };

  const handleComment = (postId: string) => {
    // Handle comment action
    console.log('Comment on post:', postId);
  };

  const handleNewPost = () => {
    // Handle new post creation
  };

  return (
    <ImageBackground 
      source={require('../../assets/pickleball-on-court.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Court Connect</Text>
          
          <View style={styles.buttonGroup}>
            <TouchableOpacity 
              style={styles.circleButton} 
              onPress={() => setMenuVisible(true)}
            >
              <Ionicons name="menu" size={24} color={COLORS.secondary} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.circleButton} 
              onPress={() => {/* Handle new post */}}
            >
              <Ionicons name="add-circle-outline" size={24} color={COLORS.secondary} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.circleButton} 
              onPress={() => {/* Handle messages */}}
            >
              <Ionicons name="chatbubbles-outline" size={24} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.content}>
          <SharePrompt onPress={handleNewPost} />
          {mockPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onComment={handleComment}
            />
          ))}
        </ScrollView>

        <Menu
          visible={menuVisible}
          onClose={() => setMenuVisible(false)}
          onSignOut={handleSignOut}
          onSuggestFeature={handleSuggestFeature}
        />
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
    marginTop: 50,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  circleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  content: {
    flex: 1,
    padding: 20,
  },
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

export default HomeScreen;
