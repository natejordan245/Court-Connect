import { Court } from '../types/Court';
import { mockPublicCourts } from '../data/mockCourts';

/**
 * Get nearby pickleball courts using mock data
 * 
 * @deprecated This function currently returns mock data.
 * In the next version, it will use the Google Places API to:
 * - Search for parks and recreation centers with pickleball courts
 * - Get real-time data about ratings, photos, and reviews
 * - Calculate accurate distances using the user's location
 */
export const getNearbyPickleballCourts = async (): Promise<Court[]> => {
  // TODO: In the next version, this will fetch real data from Google Places API
  // For now, return mock data
  return mockPublicCourts;
}; 