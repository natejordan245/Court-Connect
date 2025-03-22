import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../constants/colors';

type AuthFormProps = {
  type: 'login' | 'signup';
  email: string;
  setEmail: (text: string) => void;
  password: string;
  setPassword: (text: string) => void;
  name?: string;
  setName?: (text: string) => void;
  confirmPassword?: string;
  setConfirmPassword?: (text: string) => void;
  loading: boolean;
  errors: {[key: string]: string};
  onSubmit: () => void;
  onSwitchAuth: () => void;
};

const AuthForm = ({ 
  type,
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  confirmPassword,
  setConfirmPassword,
  loading,
  errors,
  onSubmit,
  onSwitchAuth,
}: AuthFormProps) => {
  return (
    <View style={styles.form}>
      {type === 'signup' && (
        <>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={[styles.input, errors.name ? styles.inputError : null]}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
        </>
      )}
      
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
        placeholder={type === 'signup' ? "Create a password" : "Enter your password"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
      
      {type === 'signup' && (
        <>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={[styles.input, errors.confirmPassword ? styles.inputError : null]}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
        </>
      )}
      
      <TouchableOpacity
        style={[styles.submitButton, loading && styles.buttonDisabled]}
        onPress={onSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text style={styles.submitButtonText}>
            {type === 'signup' ? 'Create Account' : 'Sign In'}
          </Text>
        )}
      </TouchableOpacity>
      
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>
          {type === 'signup' ? 'Already have an account?' : "Don't have an account?"}
        </Text>
        <TouchableOpacity onPress={onSwitchAuth}>
          <Text style={styles.switchLink}>
            {type === 'signup' ? 'Sign In' : 'Sign Up'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
    color: COLORS.white,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  inputError: {
    borderColor: '#ff6b6b',
  },
  errorText: {
    color: '#ff6b6b',
    marginBottom: 10,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: COLORS.clayBrown,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: COLORS.sageGreen,
    opacity: 0.7,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  switchText: {
    color: COLORS.white,
  },
  switchLink: {
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default AuthForm; 