import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { MainStackParamList } from '../navigation/MainNavigator';
import { Court } from '../types/Court';
import { addCourt } from '../services/courtService';
import { getData, storeData } from '../utils/storage';
import * as ImagePicker from 'expo-image-picker';

type AddCourtScreenProps = {
  navigation: NativeStackNavigationProp<MainStackParamList, 'AddCourt'>;
  route: RouteProp<MainStackParamList, 'AddCourt'>;
};

const AddCourtScreen = (props: AddCourtScreenProps) => {
  // Form state
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [requiresMembership, setRequiresMembership] = useState(false);
  const [membershipDetails, setMembershipDetails] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [website, setWebsite] = useState('');
  const [image, setImage] = useState<string | null>(null);
  
  // Submission state
  const [submitting, setSubmitting] = useState(false);
  
  // Validation state
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // In a real app, this would come from authentication
  const userId = 'demo-user-id';

  const handleBackPress = () => {
    props.navigation.goBack();
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!name.trim()) newErrors.name = 'Court name is required';
    if (!address.trim()) newErrors.address = 'Address is required';
    if (cost && isNaN(Number(cost))) newErrors.cost = 'Cost must be a number';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const pickImage = async () => {
    // Ask for permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please allow access to your photo library to add an image.');
      return;
    }
    
    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setSubmitting(true);
      
      try {
        // Create court object
        const newCourt: Omit<Court, 'id'> = {
          name,
          address,
          distance: '0 miles', // Default value
          rating: 5.0, // Default value
          isBusy: false, // Default value
          isPrivate: true,
          userId,
          cost: cost || undefined,
          requiresMembership,
          membershipDetails: requiresMembership ? membershipDetails : undefined,
          phoneNumber: phoneNumber || undefined,
          website: website || undefined,
          imageUrl: image || undefined,
          createdAt: new Date()
        };
        
        // Save to Firebase
        const courtId = await addCourt(newCourt);
        
        if (courtId) {
          Alert.alert(
            'Court Added',
            'Your private court has been added successfully!',
            [
              { 
                text: 'OK', 
                onPress: () => {
                  // Navigate back to the Tabs screen
                  props.navigation.navigate('Tabs', { 
                    user: { uid: userId, email: '', displayName: '' },
                    fromAddCourt: true 
                  });
                }
              }
            ]
          );
        } else {
          throw new Error('Failed to add court');
        }
      } catch (error) {
        console.error('Error adding court:', error);
        Alert.alert(
          'Error',
          'Failed to add court. Please try again.'
        );
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Private Court</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.formContainer} contentContainerStyle={styles.formContent}>
        <Text style={styles.sectionTitle}>Court Information</Text>
        
        <Text style={styles.label}>Court Name*</Text>
        <TextInput
          style={[styles.input, errors.name ? styles.inputError : null]}
          value={name}
          onChangeText={setName}
          placeholder="Enter court name"
        />
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
        
        <Text style={styles.label}>Address*</Text>
        <TextInput
          style={[styles.input, errors.address ? styles.inputError : null]}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter full address"
        />
        {errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}
        
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Describe the court (surface type, lighting, etc.)"
          multiline
          numberOfLines={4}
        />
        
        <Text style={styles.label}>Court Image</Text>
        <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>Tap to add an image</Text>
            </View>
          )}
        </TouchableOpacity>
        
        <Text style={styles.sectionTitle}>Access Information</Text>
        
        <Text style={styles.label}>Cost per Hour ($)</Text>
        <TextInput
          style={[styles.input, errors.cost ? styles.inputError : null]}
          value={cost}
          onChangeText={setCost}
          placeholder="Enter cost (leave blank if free)"
          keyboardType="numeric"
        />
        {errors.cost ? <Text style={styles.errorText}>{errors.cost}</Text> : null}
        
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Requires Membership</Text>
          <Switch
            value={requiresMembership}
            onValueChange={setRequiresMembership}
            trackColor={{ false: '#767577', true: '#1e88e5' }}
            thumbColor={requiresMembership ? '#ffffff' : '#f4f3f4'}
          />
        </View>
        
        {requiresMembership && (
          <>
            <Text style={styles.label}>Membership Details</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={membershipDetails}
              onChangeText={setMembershipDetails}
              placeholder="Describe membership requirements, costs, etc."
              multiline
              numberOfLines={3}
            />
          </>
        )}
        
        <Text style={styles.sectionTitle}>Contact Information</Text>
        
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Enter contact phone number"
          keyboardType="phone-pad"
        />
        
        <Text style={styles.label}>Website</Text>
        <TextInput
          style={styles.input}
          value={website}
          onChangeText={setWebsite}
          placeholder="Enter website URL"
          keyboardType="url"
        />
        
        <TouchableOpacity 
          style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={styles.submitButtonText}>Add Court</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1e88e5',
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 40,
  },
  formContainer: {
    flex: 1,
  },
  formContent: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#1e88e5',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff6b6b',
  },
  errorText: {
    color: '#ff6b6b',
    marginTop: -12,
    marginBottom: 12,
    fontSize: 14,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePickerButton: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  imagePlaceholderText: {
    color: '#757575',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#1e88e5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#90caf9',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddCourtScreen;
