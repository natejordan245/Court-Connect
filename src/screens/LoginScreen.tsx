import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  ImageBackground
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../navigation/MainNavigator';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { COLORS } from '../constants/colors';
import AuthForm from '../components/AuthForm';

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
    <ImageBackground 
      source={require('../../assets/pickleball-on-court.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.overlay}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Court Connect</Text>
          </View>

          <AuthForm
            type="login"
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            errors={errors}
            onSubmit={handleSignIn}
            onSwitchAuth={handleSignUp}
          />
        </View>
      </KeyboardAvoidingView>
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
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  headerText: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
