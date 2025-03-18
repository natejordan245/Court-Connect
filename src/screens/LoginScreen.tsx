import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../navigation/MainNavigator';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

// Uncomment these when ready to use Firebase
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../config/firebase';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<MainStackParamList, 'Login'>;
};

const LoginScreen = (props: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Navigate to Tabs screen with user data
      props.navigation.replace('Tabs', { 
        user: {
          email: user.email || '',
          displayName: user.displayName || '',
          uid: user.uid
        }
      });
    } catch (error: any) {
      setLoading(false);
      
      if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'The email address is invalid.');
      } else if (error.code === 'auth/user-disabled') {
        Alert.alert('Error', 'This user has been disabled.');
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'Invalid email or password.');
      } else {
        Alert.alert('Error', 'Failed to sign in. Please try again.');
      }
      
      console.error(error);
    }
  };

  const handleSignUp = () => {
    props.navigation.navigate('SignUp');
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Create a User object from the Firebase user
        const appUser = {
          email: user.email || '',
          displayName: user.displayName || '',
          uid: user.uid
        };
        
        // Navigate to Tabs with the user object
        props.navigation.replace('Tabs', { user: appUser });
      }
    });
    
    // Clean up subscription
    return () => unsubscribe();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.logoContainer}>
        <View style={styles.logo} />
        <Text style={styles.title}>SportSync</Text>
        <Text style={styles.subtitle}>Find courts and players near you</Text>
      </View>

      <View style={styles.formContainer}>
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
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
        
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>
        
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account?</Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1e88e5',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
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
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: '#666',
    marginRight: 5,
  },
  signUpLink: {
    color: '#1e88e5',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
