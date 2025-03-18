import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  Alert, 
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { MainStackParamList } from '../navigation/MainNavigator';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';

type SignUpScreenProps = {
  navigation: NativeStackNavigationProp<MainStackParamList, 'SignUp'>;
  route: RouteProp<MainStackParamList, 'SignUp'>;
};

const SignUpScreen = (props: SignUpScreenProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // Create user with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update profile with display name
      await updateProfile(user, {
        displayName: name
      });
      
      // Navigate to Tabs screen with user data
      props.navigation.navigate('Tabs', { 
        user: {
          email: user.email || '',
          displayName: name,
          uid: user.uid
        } 
      });
    } catch (error: any) {
      setLoading(false);
      
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'This email is already in use. Please try another one.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'The email address is invalid.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Error', 'The password is too weak.');
      } else {
        Alert.alert('Error', 'Failed to create account. Please try again.');
      }
      
      console.error(error);
    }
  };

  const handleSignIn = () => {
    props.navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join SportSync today</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={[styles.input, errors.name ? styles.inputError : null]}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
          
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, errors.email ? styles.inputError : null]}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, errors.password ? styles.inputError : null]}
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
          
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={[styles.input, errors.confirmPassword ? styles.inputError : null]}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
          
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.buttonText}>Create Account</Text>
            )}
          </TouchableOpacity>
          
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account?</Text>
            <TouchableOpacity onPress={handleSignIn}>
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1e88e5',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
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
  button: {
    backgroundColor: '#1e88e5',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#90caf9',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInText: {
    color: '#666',
    marginRight: 5,
  },
  signInLink: {
    color: '#1e88e5',
    fontWeight: 'bold',
  },
});

export default SignUpScreen; 