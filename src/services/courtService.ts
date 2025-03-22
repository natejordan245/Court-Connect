import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  doc, 
  deleteDoc,
  updateDoc,
  getDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Court } from '../types/Court';
import { mockPrivateCourts } from '../data/mockCourts';

// Collection reference
const courtsCollection = collection(db, 'courts');

// Get all public courts
export const getPublicCourts = async (): Promise<Court[]> => {
  try {
    const q = query(
      courtsCollection,
      where('isPrivate', '==', false),
      orderBy('name')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt ? data.createdAt.toDate() : new Date()
      } as Court;
    });
  } catch (error) {
    console.error('Error getting public courts:', error);
    return [];
  }
};

// Get private courts for a specific user
export const getPrivateCourts = async (userId: string): Promise<Court[]> => {
  // TODO: In the next version, this will fetch real data from Firebase
  // For now, return mock data
  return mockPrivateCourts;
};

// Add a new court
export const addCourt = async (court: Omit<Court, 'id'>): Promise<string | null> => {
  try {
    // Convert Date to Firestore Timestamp
    const courtData = {
      ...court,
      createdAt: serverTimestamp()
    };
    
    const docRef = await addDoc(courtsCollection, courtData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding court:', error);
    return null;
  }
};

// Get a court by ID
export const getCourtById = async (courtId: string): Promise<Court | null> => {
  try {
    const docRef = doc(courtsCollection, courtId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt ? data.createdAt.toDate() : new Date()
      } as Court;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting court:', error);
    return null;
  }
};

// Update a court
export const updateCourt = async (courtId: string, courtData: Partial<Court>): Promise<boolean> => {
  try {
    const docRef = doc(courtsCollection, courtId);
    await updateDoc(docRef, courtData);
    return true;
  } catch (error) {
    console.error('Error updating court:', error);
    return false;
  }
};

// Delete a court
export const deleteCourt = async (courtId: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(courtsCollection, courtId));
    return true;
  } catch (error) {
    console.error('Error deleting court:', error);
    return false;
  }
}; 