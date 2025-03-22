import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  Alert,
  ActivityIndicator,
  Linking,
  ImageBackground
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { TabParamList } from '../types/navigation';
import { Court } from '../types/Court';
import { getPrivateCourts } from '../services/courtService';
import { getNearbyPickleballCourts } from '../services/googleMapsService';
import { getData } from '../utils/storage';
import CourtsMap from '../components/CourtsMap';
import { COLORS } from '../constants/colors';

type CourtsScreenProps = {
  navigation: NativeStackNavigationProp<TabParamList, 'CourtsTab'>;
  route: RouteProp<TabParamList, 'CourtsTab'>;
};

const CourtsScreen = (props: CourtsScreenProps) => {
  const [showPrivate, setShowPrivate] = useState(false);
  const [showMapView, setShowMapView] = useState(false);
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);
  
  // In a real app, this would come from authentication
  const userId = 'demo-user-id';

  useEffect(() => {
    fetchCourts();
  }, [showPrivate]);

  const fetchCourts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (!showPrivate) {
        // Fetch nearby parks with pickleball courts using Google Maps API
        const nearbyParks = await getNearbyPickleballCourts();
        
        if (nearbyParks.length === 0) {
          // If location permission was denied, set the flag
          const locationError = await getData('locationPermissionDenied');
          if (locationError) {
            setLocationPermissionDenied(true);
          }
        }
        
        setCourts(nearbyParks);
      } else {
        // Fetch private courts for the current user from Firebase
        const privateCourts = await getPrivateCourts(userId);
        setCourts(privateCourts);
        
        // Always show list view for private courts
        setShowMapView(false);
      }
    } catch (err) {
      console.error('Error fetching courts:', err);
      setError('Failed to load courts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCourtPress = (court: Court) => {
    if (court.placeId && !showPrivate) {
      // For public courts with a placeId, open Google Maps
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(court.name)}&query_place_id=${court.placeId}`;
      Linking.openURL(url).catch(err => {
        console.error('Error opening Google Maps:', err);
        Alert.alert('Error', 'Could not open Google Maps');
      });
    } else {
      // For private courts, show details
      Alert.alert('Court Selected', `You selected ${court.name}`);
      // In a real app, this would navigate to a court detail screen
      // props.navigation.navigate('CourtDetail', { courtId: court.id });
    }
  };

  const handleAddPrivateCourt = () => {
    // Navigate to the parent navigator's AddCourt screen
    props.navigation.getParent()?.navigate('AddCourt');
  };

  const handleRetryLocationPermission = async () => {
    setLocationPermissionDenied(false);
    fetchCourts();
  };

  const toggleViewMode = () => {
    setShowMapView(!showMapView);
  };

  // This function will be called when returning from AddCourtScreen
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // Refresh the courts list when the screen comes into focus
      // If we're coming back from adding a private court, make sure we're showing private courts
      const params = props.route.params as any;
      if (params?.fromAddCourt) {
        setShowPrivate(true);
        // Clear the param to avoid issues with future navigation
        props.navigation.setParams({} as any);
      }
      fetchCourts();
    });

    return unsubscribe;
  }, [props.navigation, props.route.params]);

  const renderCourtItem = ({ item }: { item: Court }) => (
    <TouchableOpacity 
      style={styles.courtItem}
      onPress={() => handleCourtPress(item)}
    >
      <Image 
        source={item.imageUrl 
          ? (typeof item.imageUrl === 'string' ? { uri: item.imageUrl } : item.imageUrl)
          : require('../../assets/pickleball-court.jpg')} 
        style={styles.courtImage} 
      />
      {item.isPrivate && (
        <View style={styles.privateBadge}>
          <Text style={styles.privateText}>PRIVATE</Text>
        </View>
      )}
      <View style={styles.courtInfo}>
        <Text style={styles.courtName}>{item.name}</Text>
        <Text style={styles.courtAddress}>{item.address}</Text>
        <View style={styles.courtDetails}>
          <Text style={styles.courtDistance}>{item.distance}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.ratingStar}>★</Text>
          </View>
        </View>
        {item.cost && (
          <Text style={styles.costText}>
            Cost: ${item.cost}/hour
          </Text>
        )}
        {item.requiresMembership && (
          <Text style={styles.membershipText}>
            Requires Membership
          </Text>
        )}
        <View style={[
          styles.busynessBadge, 
          item.isBusy ? styles.busyBadge : styles.notBusyBadge
        ]}>
          <Text style={styles.busynessText}>
            {item.isBusy ? 'Probably Busy' : 'Probably Not Busy'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground 
      source={require('../../assets/pickleball-on-court.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Courts</Text>
        </View>

        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={[
              styles.toggleButton, 
              !showPrivate && styles.toggleButtonActive
            ]}
            onPress={() => setShowPrivate(false)}
          >
            <Text style={[
              styles.toggleText,
              !showPrivate && styles.toggleTextActive
            ]}>Nearby Parks</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.toggleButton, 
              showPrivate && styles.toggleButtonActive
            ]}
            onPress={() => setShowPrivate(true)}
          >
            <Text style={[
              styles.toggleText,
              showPrivate && styles.toggleTextActive
            ]}>Private Courts</Text>
          </TouchableOpacity>
        </View>

        {!showPrivate && !loading && !error && !locationPermissionDenied && courts.length > 0 && (
          <View style={styles.viewToggleContainer}>
            <TouchableOpacity 
              style={[
                styles.viewToggleButton, 
                !showMapView && styles.viewToggleButtonActive
              ]}
              onPress={() => setShowMapView(false)}
            >
              <Text style={[
                styles.viewToggleText,
                !showMapView && styles.viewToggleTextActive
              ]}>List</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.viewToggleButton, 
                showMapView && styles.viewToggleButtonActive
              ]}
              onPress={() => setShowMapView(true)}
            >
              <Text style={[
                styles.viewToggleText,
                showMapView && styles.viewToggleTextActive
              ]}>Map</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.listContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#1e88e5" />
              <Text style={styles.loadingText}>Loading courts...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={fetchCourts}
              >
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : locationPermissionDenied && !showPrivate ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                Location permission is required to find nearby courts.
              </Text>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={handleRetryLocationPermission}
              >
                <Text style={styles.retryButtonText}>Grant Permission</Text>
              </TouchableOpacity>
            </View>
          ) : courts.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {showPrivate 
                  ? "You haven't added any private courts yet."
                  : "No courts found nearby."
                }
              </Text>
              {showPrivate && (
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={handleAddPrivateCourt}
                >
                  <Text style={styles.addButtonText}>Add Private Court</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : showMapView ? (
            <CourtsMap 
              courts={courts}
              onCourtPress={handleCourtPress}
            />
          ) : (
            <FlatList
              data={courts}
              renderItem={renderCourtItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>

        {showPrivate && !loading && !error && (
          <TouchableOpacity 
            style={styles.floatingButton}
            onPress={handleAddPrivateCourt}
          >
            <Text style={styles.floatingButtonText}>+</Text>
          </TouchableOpacity>
        )}
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
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(43, 109, 152, 0.3)',
  },
  toggleButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: COLORS.primary,
  },
  toggleText: {
    fontSize: 16,
    color: COLORS.grey,
  },
  toggleTextActive: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  viewToggleContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(43, 109, 152, 0.3)',
  },
  viewToggleButton: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  viewToggleButtonActive: {
    backgroundColor: 'rgba(43, 109, 152, 0.2)',
  },
  viewToggleText: {
    fontSize: 14,
    color: COLORS.grey,
  },
  viewToggleTextActive: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  courtItem: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderWidth: 1,
    borderColor: 'rgba(43, 109, 152, 0.3)',
  },
  courtImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  privateBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  privateText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  courtInfo: {
    padding: 16,
  },
  courtName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: COLORS.secondary,
  },
  courtAddress: {
    fontSize: 14,
    color: COLORS.grey,
    marginBottom: 8,
  },
  courtDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  courtDistance: {
    fontSize: 14,
    color: COLORS.grey,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 2,
    color: COLORS.secondary,
  },
  ratingStar: {
    color: '#ffc107',
    fontSize: 14,
  },
  costText: {
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 4,
  },
  membershipText: {
    fontSize: 14,
    color: COLORS.secondary,
    marginBottom: 4,
  },
  busynessBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 4,
  },
  busyBadge: {
    backgroundColor: 'rgba(255, 99, 71, 0.1)',
  },
  notBusyBadge: {
    backgroundColor: 'rgba(43, 109, 152, 0.1)',
  },
  busynessText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.grey,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.grey,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.grey,
    textAlign: 'center',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  floatingButtonText: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CourtsScreen; 