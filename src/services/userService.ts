import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { UserProfile } from '../types/User';

export const getUserProfile = async (userId: string): Promise<UserProfile> => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.data() as UserProfile;
};

export const updateUserProfile = async (userId: string, data: Partial<UserProfile>): Promise<void> => {
  const docRef = doc(db, 'users', userId);
  await updateDoc(docRef, data);
}; 