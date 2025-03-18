import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import env from './env';

// Firebase configuration
const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID
};

// Debug logging
console.log('Firebase Config:', {
  apiKey: firebaseConfig.apiKey ? '**present**' : '**missing**',
  authDomain: firebaseConfig.authDomain ? '**present**' : '**missing**',
  projectId: firebaseConfig.projectId ? '**present**' : '**missing**',
  storageBucket: firebaseConfig.storageBucket ? '**present**' : '**missing**',
  messagingSenderId: firebaseConfig.messagingSenderId ? '**present**' : '**missing**',
  appId: firebaseConfig.appId ? '**present**' : '**missing**'
});

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Get Auth instance
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
