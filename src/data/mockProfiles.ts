import { UserProfile } from '../types/User';

/**
 * Mock profile data for the profile feature
 * 
 * @deprecated This mock data is temporary and will be replaced in the next version with:
 * - Real user data from Firebase Authentication
 * - Verified skill levels and rankings
 * - Real-time match statistics
 * - Achievement badges and history
 * - Court preferences and favorite locations
 * 
 * Future Implementation Plan:
 * 1. Integrate with Firebase Authentication for real user profiles
 * 2. Add skill level verification system
 * 3. Implement real-time match statistics tracking
 * 4. Add achievements and badges system
 * 5. Include court preferences and favorite locations
 * 6. Add profile verification and ranking system
 */

export const mockProfiles: Record<string, UserProfile> = {
  'default': {
    uid: 'mock-user-1',
    email: 'john.smith@example.com',
    displayName: 'John Smith',
    location: 'Seattle, WA',
    photoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    skillLevel: '4.0',
    playStyle: 'Aggressive Baseliner',
    availability: 'Weekday evenings, Weekend mornings',
    bio: 'Passionate pickleball player looking to improve my game and meet new partners.',
    matchesPlayed: 45,
    wins: 28,
  },
  // Add more mock profiles as needed
}; 