import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  Animated,
  Dimensions,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { MatchUser } from '../data/mockUsers';

const SCREEN_WIDTH = Dimensions.get('window').width;

type MatchCardProps = {
  user: MatchUser;
  style?: object;
  isActive?: boolean;
  likeOpacity?: Animated.AnimatedInterpolation<string | number>;
  nopeOpacity?: Animated.AnimatedInterpolation<string | number>;
  panHandlers?: object;
};

const MatchCard = ({ 
  user, 
  style = {}, 
  isActive = false,
  likeOpacity,
  nopeOpacity,
  panHandlers = {},
}: MatchCardProps) => {
  return (
    <Animated.View
      style={[styles.cardStyle, style]}
      {...panHandlers}
    >
      <Image source={{ uri: user.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.nameText}>{user.name}, {user.age}</Text>
          <Text style={styles.skillLevelText}>{user.skillLevel}</Text>
        </View>
        <Text style={styles.locationText}>{user.location}</Text>
        <Text style={styles.bioText}>{user.bio}</Text>
      </View>

      {isActive && likeOpacity && (
        <Animated.View
          style={[
            styles.overlayLabel,
            styles.likeLabel,
            { opacity: likeOpacity },
          ]}
        >
          <Text style={[styles.overlayText, styles.likeText]}>Match Up</Text>
        </Animated.View>
      )}

      {isActive && nopeOpacity && (
        <Animated.View
          style={[
            styles.overlayLabel,
            styles.nopeLabel,
            { opacity: nopeOpacity },
          ]}
        >
          <Text style={[styles.overlayText, styles.nopeText]}>Skip</Text>
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    width: SCREEN_WIDTH - 40,
    height: 650,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    position: 'absolute',
    top: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '75%',
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.clayBrown,
  },
  skillLevelText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.sageGreen,
  },
  locationText: {
    fontSize: 16,
    color: COLORS.grey,
    marginBottom: 8,
  },
  bioText: {
    fontSize: 16,
    color: COLORS.clayBrown,
    lineHeight: 22,
  },
  overlayLabel: {
    position: 'absolute',
    padding: 10,
    borderWidth: 3,
    borderRadius: 10,
    top: 50,
  },
  likeLabel: {
    right: 40,
    borderColor: COLORS.sageGreen,
  },
  nopeLabel: {
    left: 40,
    borderColor: '#ff6b6b',
  },
  overlayText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  likeText: {
    color: COLORS.sageGreen,
  },
  nopeText: {
    color: '#ff6b6b',
  },
});

export default MatchCard; 