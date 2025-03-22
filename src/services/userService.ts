import { UserProfile } from '../types/User';
import { mockProfiles } from '../data/mockProfiles';

export const getUserProfile = async (userId: string): Promise<UserProfile> => {
  // In development, return mock data
  const mockProfile = mockProfiles['default'];
  return {
    ...mockProfile,
    uid: userId,
    email: 'john.smith@example.com'
  };
};

export const updateUserProfile = async (userId: string, data: Partial<UserProfile>): Promise<void> => {
  // In development, just log the update
  console.log('Profile update (mock):', data);
}; 