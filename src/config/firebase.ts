import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBN1ZOmzpWi3XCgL8-ZksT_B5o8n6A_-S8",
  authDomain: "sandbox-ce83d.firebaseapp.com",
  projectId: "sandbox-ce83d",
  storageBucket: "sandbox-ce83d.appspot.com",
  messagingSenderId: "662601386661",
  appId: "1:662601386661:ios:1d187ed1e3fcdfee605b4c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
